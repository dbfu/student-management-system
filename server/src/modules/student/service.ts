import prisma from '../../lib/prisma'
import { Prisma } from '@prisma/client'

export interface StudentQuery {
  page?: number
  pageSize?: number
  keyword?: string
  classId?: number
  status?: string
}

export interface StudentInput {
  code: string
  name: string
  gender: string
  birthDate?: string
  phone?: string
  email?: string
  classId: number
  enrollYear: number
  status: string
  address?: string
}

// 获取学生列表
export async function getStudentsService(query: StudentQuery) {
  const { page = 1, pageSize = 10, keyword, classId, status } = query

  const where: Prisma.StudentWhereInput = {}

  // 搜索关键字（学号或姓名）
  if (keyword) {
    where.OR = [
      { code: { contains: keyword } },
      { name: { contains: keyword } },
    ]
  }

  // 班级筛选
  if (classId) {
    where.classId = classId
  }

  // 学籍状态筛选
  if (status) {
    where.status = status
  }

  const [list, total] = await Promise.all([
    prisma.student.findMany({
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
        classId: true,
        enrollYear: true,
        status: true,
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    }),
    prisma.student.count({ where }),
  ])

  return {
    list,
    total,
    page,
    pageSize,
  }
}

// 获取学生详情
export async function getStudentService(id: number) {
  const student = await prisma.student.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      gender: true,
      birthDate: true,
      phone: true,
      email: true,
      classId: true,
      enrollYear: true,
      status: true,
      address: true,
      class: {
        select: {
          id: true,
          name: true,
          code: true,
          collegeId: true,
          majorId: true,
          college: {
            select: {
              id: true,
              name: true,
            },
          },
          major: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })

  if (!student) {
    throw new Error('学生不存在')
  }

  return student
}

// 创建学生
export async function createStudentService(input: StudentInput) {
  // 检查学号是否已存在
  const existing = await prisma.student.findUnique({
    where: { code: input.code },
  })

  if (existing) {
    throw new Error('学号已存在')
  }

  // 检查班级是否存在
  const classInfo = await prisma.class.findUnique({
    where: { id: input.classId },
  })

  if (!classInfo) {
    throw new Error('班级不存在')
  }

  const student = await prisma.student.create({
    data: {
      code: input.code,
      name: input.name,
      gender: input.gender,
      birthDate: input.birthDate ? new Date(input.birthDate) : null,
      phone: input.phone,
      email: input.email,
      classId: input.classId,
      enrollYear: input.enrollYear,
      status: input.status,
      address: input.address,
    },
  })

  return student
}

// 更新学生
export async function updateStudentService(id: number, input: Partial<StudentInput>) {
  // 检查学生是否存在
  const existing = await prisma.student.findUnique({
    where: { id },
  })

  if (!existing) {
    throw new Error('学生不存在')
  }

  // 如果修改学号，检查是否重复
  if (input.code && input.code !== existing.code) {
    const duplicate = await prisma.student.findUnique({
      where: { code: input.code },
    })

    if (duplicate) {
      throw new Error('学号已存在')
    }
  }

  // 如果修改班级，检查班级是否存在
  if (input.classId && input.classId !== existing.classId) {
    const classInfo = await prisma.class.findUnique({
      where: { id: input.classId },
    })

    if (!classInfo) {
      throw new Error('班级不存在')
    }
  }

  const student = await prisma.student.update({
    where: { id },
    data: {
      code: input.code,
      name: input.name,
      gender: input.gender,
      birthDate: input.birthDate ? new Date(input.birthDate) : existing.birthDate,
      phone: input.phone,
      email: input.email,
      classId: input.classId,
      enrollYear: input.enrollYear,
      status: input.status,
      address: input.address,
    },
  })

  return student
}

// 删除学生
export async function deleteStudentService(id: number) {
  // 检查学生是否存在
  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      grades: { take: 1 },
      attendances: { take: 1 },
    },
  })

  if (!student) {
    throw new Error('学生不存在')
  }

  // 检查是否有关联成绩或考勤记录
  if (student.grades.length > 0 || student.attendances.length > 0) {
    // 有关联记录，修改学籍状态为"已毕业"或"退学"而不是物理删除
    await prisma.student.update({
      where: { id },
      data: { status: '已毕业' },
    })
    return { message: '学生已有关联记录，学籍状态已更新为已毕业' }
  }

  // 无关联记录，可以物理删除
  await prisma.student.delete({
    where: { id },
  })

  return { message: '删除成功' }
}