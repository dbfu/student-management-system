import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始初始化数据库数据...')

  // 1. 创建初始管理员用户
  const existingAdmin = await prisma.user.findUnique({
    where: { username: 'admin' },
  })

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10)
    await prisma.user.create({
      data: {
        username: 'admin',
        password: hashedPassword,
        name: '管理员',
      },
    })
    console.log('✓ 管理员用户创建完成: admin / admin123')
  } else {
    console.log('✓ 管理员用户已存在')
  }

  // 2. 创建学院数据
  const colleges = await prisma.college.createMany({
    data: [
      { name: '计算机学院' },
      { name: '电子信息学院' },
      { name: '机械工程学院' },
      { name: '经济管理学院' },
      { name: '外国语学院' },
    ],
    skipDuplicates: true,
  })
  console.log(`✓ 创建 ${colleges.count} 个学院`)

  // 3. 获取学院ID并创建专业数据
  const collegeList = await prisma.college.findMany()
  const collegeMap = new Map(collegeList.map(c => [c.name, c.id]))

  const majors = await prisma.major.createMany({
    data: [
      { name: '计算机科学与技术', collegeId: collegeMap.get('计算机学院') || 1 },
      { name: '软件工程', collegeId: collegeMap.get('计算机学院') || 1 },
      { name: '人工智能', collegeId: collegeMap.get('计算机学院') || 1 },
      { name: '电子信息工程', collegeId: collegeMap.get('电子信息学院') || 2 },
      { name: '通信工程', collegeId: collegeMap.get('电子信息学院') || 2 },
      { name: '机械设计制造及其自动化', collegeId: collegeMap.get('机械工程学院') || 3 },
      { name: '工业工程', collegeId: collegeMap.get('机械工程学院') || 3 },
      { name: '工商管理', collegeId: collegeMap.get('经济管理学院') || 4 },
      { name: '会计学', collegeId: collegeMap.get('经济管理学院') || 4 },
      { name: '英语', collegeId: collegeMap.get('外国语学院') || 5 },
    ],
    skipDuplicates: true,
  })
  console.log(`✓ 创建 ${majors.count} 个专业`)

  // 4. 创建教师数据
  const teacherList = await prisma.teacher.findMany()
  if (teacherList.length === 0) {
    const teachers = [
      { code: 'T001', name: '张教授', gender: '男', collegeId: collegeMap.get('计算机学院') || 1, title: '教授', status: '在职' },
      { code: 'T002', name: '李副教授', gender: '女', collegeId: collegeMap.get('计算机学院') || 1, title: '副教授', status: '在职' },
      { code: 'T003', name: '王讲师', gender: '男', collegeId: collegeMap.get('电子信息学院') || 2, title: '讲师', status: '在职' },
      { code: 'T004', name: '刘教授', gender: '男', collegeId: collegeMap.get('机械工程学院') || 3, title: '教授', status: '在职' },
      { code: 'T005', name: '陈副教授', gender: '女', collegeId: collegeMap.get('经济管理学院') || 4, title: '副教授', status: '在职' },
    ]

    for (const teacher of teachers) {
      await prisma.teacher.create({ data: teacher })
    }
    console.log(`✓ 创建 ${teachers.length} 个教师`)
  } else {
    console.log('✓ 教师数据已存在')
  }

  // 5. 创建班级数据
  const classList = await prisma.class.findMany()
  if (classList.length === 0) {
    const majorList = await prisma.major.findMany()
    const majorMap = new Map(majorList.map(m => [m.name, m.id]))

    const classes = [
      { code: 'CS2401', name: '计算机2401班', collegeId: collegeMap.get('计算机学院') || 1, majorId: majorMap.get('计算机科学与技术') || 1, grade: 2024 },
      { code: 'CS2402', name: '计算机2402班', collegeId: collegeMap.get('计算机学院') || 1, majorId: majorMap.get('软件工程') || 2, grade: 2024 },
      { code: 'EI2401', name: '电子2401班', collegeId: collegeMap.get('电子信息学院') || 2, majorId: majorMap.get('电子信息工程') || 4, grade: 2024 },
      { code: 'ME2401', name: '机械2401班', collegeId: collegeMap.get('机械工程学院') || 3, majorId: majorMap.get('机械设计制造及其自动化') || 6, grade: 2024 },
      { code: 'EM2401', name: '经管2401班', collegeId: collegeMap.get('经济管理学院') || 4, majorId: majorMap.get('工商管理') || 8, grade: 2024 },
    ]

    for (const classInfo of classes) {
      await prisma.class.create({ data: classInfo })
    }
    console.log(`✓ 创建 ${classes.length} 个班级`)
  } else {
    console.log('✓ 班级数据已存在')
  }

  // 6. 创建学生数据
  const studentList = await prisma.student.findMany()
  if (studentList.length === 0) {
    const classList = await prisma.class.findMany()
    const classMap = new Map(classList.map(c => [c.code, c.id]))

    const students = [
      { code: 'S2024001', name: '张三', gender: '男', classId: classMap.get('CS2401') || 1, enrollYear: 2024, status: '在读' },
      { code: 'S2024002', name: '李四', gender: '女', classId: classMap.get('CS2401') || 1, enrollYear: 2024, status: '在读' },
      { code: 'S2024003', name: '王五', gender: '男', classId: classMap.get('CS2402') || 2, enrollYear: 2024, status: '在读' },
      { code: 'S2024004', name: '赵六', gender: '女', classId: classMap.get('EI2401') || 3, enrollYear: 2024, status: '在读' },
      { code: 'S2024005', name: '钱七', gender: '男', classId: classMap.get('ME2401') || 4, enrollYear: 2024, status: '在读' },
    ]

    for (const student of students) {
      await prisma.student.create({ data: student })
    }
    console.log(`✓ 创建 ${students.length} 个学生`)
  } else {
    console.log('✓ 学生数据已存在')
  }

  console.log('数据库初始化完成！')
}

main()
  .catch((e) => {
    console.error('数据库初始化失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })