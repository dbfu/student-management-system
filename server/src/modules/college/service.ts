import prisma from '../../lib/prisma'

// 获取学院列表
export async function getCollegesService() {
  const colleges = await prisma.college.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      id: 'asc',
    },
  })

  return colleges
}

// 获取专业列表
export async function getMajorsService(collegeId?: number) {
  const where = collegeId ? { collegeId } : {}

  const majors = await prisma.major.findMany({
    where,
    select: {
      id: true,
      name: true,
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
  })

  return majors
}

// 创建学院
export async function createCollegeService(name: string) {
  const existing = await prisma.college.findUnique({
    where: { name },
  })

  if (existing) {
    throw new Error('学院名称已存在')
  }

  const college = await prisma.college.create({
    data: { name },
  })

  return college
}

// 创建专业
export async function createMajorService(name: string, collegeId: number) {
  // 检查学院是否存在
  const college = await prisma.college.findUnique({
    where: { id: collegeId },
  })

  if (!college) {
    throw new Error('学院不存在')
  }

  // 检查专业是否已存在（同一学院下）
  const existing = await prisma.major.findFirst({
    where: { name, collegeId },
  })

  if (existing) {
    throw new Error('该学院下已存在同名专业')
  }

  const major = await prisma.major.create({
    data: { name, collegeId },
  })

  return major
}