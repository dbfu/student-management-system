import prisma from '../../lib/prisma'
import { Prisma } from '@prisma/client'

export interface TeacherQuery {
  page?: number
  pageSize?: number
  keyword?: string
  collegeId?: number
  status?: string
}

export interface TeacherInput {
  code: string
  name: string
  gender: string
  phone?: string
  email?: string
  collegeId: number
  title?: string
  status: string
}

// 获取教师列表
export async function getTeachersService(query: TeacherQuery) {
  const { page = 1, pageSize = 10, keyword, collegeId, status } = query

  const where: Prisma.TeacherWhereInput = {}

  // 搜索关键字（工号或姓名）
  if (keyword) {
    where.OR = [
      { code: { contains: keyword } },
      { name: { contains: keyword } },
    ]
  }

  // 学院筛选
  if (collegeId) {
    where.collegeId = collegeId
  }

  // 状态筛选
  if (status) {
    where.status = status
  }

  const [list, total] = await Promise.all([
    prisma.teacher.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        code: true,
        name: true,
        gender: true,
        phone: true,
        email: true,
        title: true,
        status: true,
        collegeId: true,
        college: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    }),
    prisma.teacher.count({ where }),
  ])

  return {
    list,
    total,
    page,
    pageSize,
  }
}

// 获取教师详情
export async function getTeacherService(id: number) {
  const teacher = await prisma.teacher.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      gender: true,
      phone: true,
      email: true,
      title: true,
      status: true,
      collegeId: true,
      college: {
        select: {
          id: true,
          name: true,
        },
      },
      courses: {
        select: {
          courseId: true,
          course: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
        },
      },
    },
  })

  if (!teacher) {
    throw new Error('教师不存在')
  }

  return {
    ...teacher,
    courses: teacher.courses.map(ct => ct.course),
  }
}

// 创建教师
export async function createTeacherService(input: TeacherInput) {
  // 检查工号是否已存在
  const existing = await prisma.teacher.findUnique({
    where: { code: input.code },
  })

  if (existing) {
    throw new Error('教师工号已存在')
  }

  // 检查学院是否存在
  const college = await prisma.college.findUnique({
    where: { id: input.collegeId },
  })

  if (!college) {
    throw new Error('学院不存在')
  }

  const teacher = await prisma.teacher.create({
    data: {
      code: input.code,
      name: input.name,
      gender: input.gender,
      phone: input.phone,
      email: input.email,
      collegeId: input.collegeId,
      title: input.title,
      status: input.status,
    },
  })

  return teacher
}

// 更新教师
export async function updateTeacherService(id: number, input: Partial<TeacherInput>) {
  // 检查教师是否存在
  const existing = await prisma.teacher.findUnique({
    where: { id },
  })

  if (!existing) {
    throw new Error('教师不存在')
  }

  // 如果修改工号，检查是否重复
  if (input.code && input.code !== existing.code) {
    const duplicate = await prisma.teacher.findUnique({
      where: { code: input.code },
    })

    if (duplicate) {
      throw new Error('教师工号已存在')
    }
  }

  // 如果修改学院，检查学院是否存在
  if (input.collegeId && input.collegeId !== existing.collegeId) {
    const college = await prisma.college.findUnique({
      where: { id: input.collegeId },
    })

    if (!college) {
      throw new Error('学院不存在')
    }
  }

  const teacher = await prisma.teacher.update({
    where: { id },
    data: {
      code: input.code,
      name: input.name,
      gender: input.gender,
      phone: input.phone,
      email: input.email,
      collegeId: input.collegeId,
      title: input.title,
      status: input.status,
    },
  })

  return teacher
}

// 删除教师
export async function deleteTeacherService(id: number) {
  // 检查教师是否存在
  const teacher = await prisma.teacher.findUnique({
    where: { id },
    include: {
      courses: { take: 1 },
      classes: { take: 1 },
    },
  })

  if (!teacher) {
    throw new Error('教师不存在')
  }

  // 检查是否有绑定课程或班级
  if (teacher.courses.length > 0 || teacher.classes.length > 0) {
    // 有绑定关系，修改状态为"离职"而不是物理删除
    await prisma.teacher.update({
      where: { id },
      data: { status: '离职' },
    })
    return { message: '教师已绑定课程或班级，状态已更新为离职' }
  }

  // 无绑定关系，可以物理删除
  await prisma.teacher.delete({
    where: { id },
  })

  return { message: '删除成功' }
}

// 分配课程给教师
export async function assignCoursesService(teacherId: number, courseIds: number[]) {
  // 检查教师是否存在
  const teacher = await prisma.teacher.findUnique({
    where: { id: teacherId },
  })

  if (!teacher) {
    throw new Error('教师不存在')
  }

  // 检查课程是否存在
  const courses = await prisma.course.findMany({
    where: { id: { in: courseIds } },
  })

  if (courses.length !== courseIds.length) {
    throw new Error('部分课程不存在')
  }

  // 先删除现有的关联
  await prisma.courseTeacher.deleteMany({
    where: { teacherId },
  })

  // 创建新的关联
  await prisma.courseTeacher.createMany({
    data: courseIds.map(courseId => ({
      courseId,
      teacherId,
    })),
  })

  return { message: '课程分配成功' }
}