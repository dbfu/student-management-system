import prisma from '../../lib/prisma'
import { Prisma } from '@prisma/client'

export interface ClassQuery {
  page?: number
  pageSize?: number
  keyword?: string
  collegeId?: number
  majorId?: number
}

export interface ClassInput {
  code: string
  name: string
  collegeId: number
  majorId: number
  grade: number
  teacherId?: number
}

// 获取班级列表
export async function getClassesService(query: ClassQuery) {
  const { page = 1, pageSize = 10, keyword, collegeId, majorId } = query

  const where: Prisma.ClassWhereInput = {}

  // 搜索关键字（编号或名称）
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

  // 专业筛选
  if (majorId) {
    where.majorId = majorId
  }

  const [list, total] = await Promise.all([
    prisma.class.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        code: true,
        name: true,
        grade: true,
        collegeId: true,
        majorId: true,
        teacherId: true,
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
        teacher: {
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
    prisma.class.count({ where }),
  ])

  // 计算每个班级的学生人数
  const classIds = list.map(c => c.id)
  const studentCounts = await prisma.student.groupBy({
    by: ['classId'],
    where: { classId: { in: classIds } },
    _count: { id: true },
  })

  const countMap = new Map(studentCounts.map(sc => [sc.classId, sc._count.id]))

  const result = list.map(classInfo => ({
    ...classInfo,
    studentCount: countMap.get(classInfo.id) || 0,
  }))

  return {
    list: result,
    total,
    page,
    pageSize,
  }
}

// 获取班级详情
export async function getClassService(id: number) {
  const classInfo = await prisma.class.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      grade: true,
      collegeId: true,
      majorId: true,
      teacherId: true,
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
      teacher: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
  })

  if (!classInfo) {
    throw new Error('班级不存在')
  }

  // 统计班级学生人数
  const studentCount = await prisma.student.count({
    where: { classId: id },
  })

  return {
    ...classInfo,
    studentCount,
  }
}

// 创建班级
export async function createClassService(input: ClassInput) {
  // 检查班级编号是否已存在
  const existing = await prisma.class.findUnique({
    where: { code: input.code },
  })

  if (existing) {
    throw new Error('班级编号已存在')
  }

  // 检查学院是否存在
  const college = await prisma.college.findUnique({
    where: { id: input.collegeId },
  })

  if (!college) {
    throw new Error('学院不存在')
  }

  // 检查专业是否存在
  const major = await prisma.major.findUnique({
    where: { id: input.majorId },
  })

  if (!major) {
    throw new Error('专业不存在')
  }

  // 检查班主任是否存在（如果有）
  if (input.teacherId) {
    const teacher = await prisma.teacher.findUnique({
      where: { id: input.teacherId },
    })

    if (!teacher) {
      throw new Error('教师不存在')
    }
  }

  const classInfo = await prisma.class.create({
    data: {
      code: input.code,
      name: input.name,
      collegeId: input.collegeId,
      majorId: input.majorId,
      grade: input.grade,
      teacherId: input.teacherId,
    },
  })

  return classInfo
}

// 更新班级
export async function updateClassService(id: number, input: Partial<ClassInput>) {
  // 检查班级是否存在
  const existing = await prisma.class.findUnique({
    where: { id },
  })

  if (!existing) {
    throw new Error('班级不存在')
  }

  // 如果修改班级编号，检查是否重复
  if (input.code && input.code !== existing.code) {
    const duplicate = await prisma.class.findUnique({
      where: { code: input.code },
    })

    if (duplicate) {
      throw new Error('班级编号已存在')
    }
  }

  // 检查学院是否存在（如果要修改）
  if (input.collegeId && input.collegeId !== existing.collegeId) {
    const college = await prisma.college.findUnique({
      where: { id: input.collegeId },
    })

    if (!college) {
      throw new Error('学院不存在')
    }
  }

  // 检查专业是否存在（如果要修改）
  if (input.majorId && input.majorId !== existing.majorId) {
    const major = await prisma.major.findUnique({
      where: { id: input.majorId },
    })

    if (!major) {
      throw new Error('专业不存在')
    }
  }

  // 检查班主任是否存在（如果要修改）
  if (input.teacherId) {
    const teacher = await prisma.teacher.findUnique({
      where: { id: input.teacherId },
    })

    if (!teacher) {
      throw new Error('教师不存在')
    }
  }

  const classInfo = await prisma.class.update({
    where: { id },
    data: {
      code: input.code,
      name: input.name,
      collegeId: input.collegeId,
      majorId: input.majorId,
      grade: input.grade,
      teacherId: input.teacherId,
    },
  })

  return classInfo
}

// 删除班级
export async function deleteClassService(id: number) {
  // 检查班级是否存在
  const classInfo = await prisma.class.findUnique({
    where: { id },
    include: {
      students: { take: 1 },
    },
  })

  if (!classInfo) {
    throw new Error('班级不存在')
  }

  // 检查班级下是否有学生
  if (classInfo.students.length > 0) {
    throw new Error('班级下存在学生，无法删除')
  }

  await prisma.class.delete({
    where: { id },
  })

  return { message: '删除成功' }
}

// 获取班级学生列表
export async function getClassStudentsService(classId: number, page: number = 1, pageSize: number = 10) {
  // 检查班级是否存在
  const classInfo = await prisma.class.findUnique({
    where: { id: classId },
  })

  if (!classInfo) {
    throw new Error('班级不存在')
  }

  const [list, total] = await Promise.all([
    prisma.student.findMany({
      where: { classId },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        code: true,
        name: true,
        gender: true,
        status: true,
        phone: true,
        email: true,
      },
      orderBy: {
        id: 'asc',
      },
    }),
    prisma.student.count({ where: { classId } }),
  ])

  return {
    list,
    total,
    page,
    pageSize,
  }
}