import { FastifyRequest, FastifyReply } from 'fastify'
import { success, error, paginate } from '../../shared/utils/response'
import * as teacherService from './service'

// 查询参数类型
interface TeacherQueryParams {
  page?: number
  pageSize?: number
  keyword?: string
  collegeId?: number
  status?: string
}

// 教师输入类型
interface TeacherBody {
  code: string
  name: string
  gender: string
  phone?: string
  email?: string
  collegeId: number
  title?: string
  status: string
}

// 路径参数类型
interface IdParams {
  id: number
}

// 分配课程请求体
interface AssignCoursesBody {
  courseIds: number[]
}

// 获取教师列表
export async function getTeachersController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const query = request.query as TeacherQueryParams
    const { page, pageSize, keyword, collegeId, status } = query

    const result = await teacherService.getTeachersService({
      page: page || 1,
      pageSize: pageSize || 10,
      keyword,
      collegeId,
      status,
    })

    return reply.send(success(paginate(result.list, result.total, result.page, result.pageSize)))
  } catch (err) {
    const message = err instanceof Error ? err.message : '获取教师列表失败'
    return reply.code(500).send(error(5000, message))
  }
}

// 获取教师详情
export async function getTeacherController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const params = request.params as IdParams
    const { id } = params
    const teacher = await teacherService.getTeacherService(id)
    return reply.send(success(teacher))
  } catch (err) {
    const message = err instanceof Error ? err.message : '获取教师详情失败'
    const code = message.includes('教师不存在') ? 4002 : 5000
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}

// 创建教师
export async function createTeacherController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body = request.body as TeacherBody
    const { code, name, gender, collegeId, status } = body

    // 必填字段校验
    if (!code || !name || !gender || !collegeId || !status) {
      return reply.code(400).send(error(1001, '必填字段不能为空'))
    }

    // 手机号格式校验
    const phone = body.phone
    if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
      return reply.code(400).send(error(1001, '手机号格式不正确'))
    }

    // 邮箱格式校验
    const email = body.email
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return reply.code(400).send(error(1001, '邮箱格式不正确'))
    }

    const teacher = await teacherService.createTeacherService(body)
    return reply.send(success({ id: teacher.id }, '添加成功'))
  } catch (err) {
    const message = err instanceof Error ? err.message : '创建教师失败'
    let code = 5000
    if (message.includes('教师工号已存在')) code = 4001
    else if (message.includes('学院不存在')) code = 5002
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}

// 更新教师
export async function updateTeacherController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const params = request.params as IdParams
    const body = request.body as Partial<TeacherBody>
    const { id } = params

    // 手机号格式校验
    const phone = body.phone
    if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
      return reply.code(400).send(error(1001, '手机号格式不正确'))
    }

    // 邮箱格式校验
    const email = body.email
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return reply.code(400).send(error(1001, '邮箱格式不正确'))
    }

    await teacherService.updateTeacherService(id, body)
    return reply.send(success(null, '修改成功'))
  } catch (err) {
    const message = err instanceof Error ? err.message : '更新教师失败'
    let code = 5000
    if (message.includes('教师不存在')) code = 4002
    else if (message.includes('教师工号已存在')) code = 4001
    else if (message.includes('学院不存在')) code = 5002
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}

// 删除教师
export async function deleteTeacherController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const params = request.params as IdParams
    const { id } = params
    const result = await teacherService.deleteTeacherService(id)
    return reply.send(success(null, result.message))
  } catch (err) {
    const message = err instanceof Error ? err.message : '删除教师失败'
    const code = message.includes('教师不存在') ? 4002 : 5000
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}

// 分配课程
export async function assignCoursesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const params = request.params as IdParams
    const body = request.body as AssignCoursesBody
    const { id } = params
    const { courseIds } = body

    if (!courseIds || !Array.isArray(courseIds) || courseIds.length === 0) {
      return reply.code(400).send(error(1001, '课程ID列表不能为空'))
    }

    await teacherService.assignCoursesService(id, courseIds)
    return reply.send(success(null, '课程分配成功'))
  } catch (err) {
    const message = err instanceof Error ? err.message : '课程分配失败'
    let code = 5000
    if (message.includes('教师不存在')) code = 4002
    else if (message.includes('课程不存在')) code = 6002
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}