import prisma from '../../lib/prisma'

// 首页统计
export async function getDashboardStatisticsService() {
  // 并行查询各类统计数据
  const [
    studentCount,
    teacherCount,
    classCount,
    courseCount,
  ] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.class.count(),
    prisma.course.count(),
  ])

  // 查询最近新增的学生（最新5条）
  const recentStudents = await prisma.student.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      code: true,
      name: true,
      createdAt: true,
      class: {
        select: {
          name: true,
        },
      },
    },
  })

  // 查询各学院学生人数分布
  const collegeDistribution = await prisma.student.groupBy({
    by: ['classId'],
    _count: { id: true },
  })

  // 获取班级信息来关联学院
  const classIds = collegeDistribution.map(cd => cd.classId)
  const classes = await prisma.class.findMany({
    where: { id: { in: classIds } },
    select: {
      id: true,
      collegeId: true,
      college: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  const classMap = new Map(classes.map(c => [c.id, c]))

  // 按学院汇总学生人数
  const collegeStudentCounts = new Map<number, { collegeId: number; collegeName: string; count: number }>()
  for (const cd of collegeDistribution) {
    const classInfo = classMap.get(cd.classId)
    if (classInfo) {
      const existing = collegeStudentCounts.get(classInfo.collegeId)
      if (existing) {
        existing.count += cd._count.id
      } else {
        collegeStudentCounts.set(classInfo.collegeId, {
          collegeId: classInfo.collegeId,
          collegeName: classInfo.college.name,
          count: cd._count.id,
        })
      }
    }
  }

  return {
    studentCount,
    teacherCount,
    classCount,
    courseCount,
    recentStudents,
    collegeDistribution: Array.from(collegeStudentCounts.values()),
  }
}

// 学生统计（按维度）
export async function getStudentStatisticsService(dimension: string) {
  let result: any[]

  switch (dimension) {
    case 'college':
      // 按学院统计
      const collegeStats = await prisma.class.findMany({
        select: {
          collegeId: true,
          college: {
            select: {
              id: true,
              name: true,
            },
          },
          students: {
            select: { id: true },
          },
        },
      })
      const collegeMap = new Map<number, { id: number; name: string; count: number }>()
      for (const cs of collegeStats) {
        const existing = collegeMap.get(cs.collegeId)
        if (existing) {
          existing.count += cs.students.length
        } else {
          collegeMap.set(cs.collegeId, {
            id: cs.collegeId,
            name: cs.college.name,
            count: cs.students.length,
          })
        }
      }
      result = Array.from(collegeMap.values())
      break

    case 'major':
      // 按专业统计
      const majorStats = await prisma.class.findMany({
        select: {
          majorId: true,
          major: {
            select: {
              id: true,
              name: true,
            },
          },
          students: {
            select: { id: true },
          },
        },
      })
      const majorMap = new Map<number, { id: number; name: string; count: number }>()
      for (const ms of majorStats) {
        const existing = majorMap.get(ms.majorId)
        if (existing) {
          existing.count += ms.students.length
        } else {
          majorMap.set(ms.majorId, {
            id: ms.majorId,
            name: ms.major.name,
            count: ms.students.length,
          })
        }
      }
      result = Array.from(majorMap.values())
      break

    case 'class':
      // 按班级统计
      const classStats = await prisma.class.findMany({
        select: {
          id: true,
          name: true,
          code: true,
          _count: {
            select: { students: true },
          },
        },
        orderBy: { id: 'asc' },
      })
      result = classStats.map(cs => ({
        id: cs.id,
        name: cs.name,
        code: cs.code,
        count: cs._count.students,
      }))
      break

    case 'year':
      // 按年级统计
      const yearStats = await prisma.class.findMany({
        select: {
          grade: true,
          students: {
            select: { id: true },
          },
        },
      })
      const yearMap = new Map<number, { year: number; count: number }>()
      for (const ys of yearStats) {
        const existing = yearMap.get(ys.grade)
        if (existing) {
          existing.count += ys.students.length
        } else {
          yearMap.set(ys.grade, {
            year: ys.grade,
            count: ys.students.length,
          })
        }
      }
      result = Array.from(yearMap.values())
      break

    default:
      throw new Error('不支持的统计维度')
  }

  return result
}