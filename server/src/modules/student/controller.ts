import { FastifyRequest, FastifyReply } from 'fastify'
import { success, error, paginate } from '../../shared/utils/response'
import * as studentService from './service'

// 查询参数类型
interface StudentQueryParams {
  page?: number
  pageSize?: number
  keyword?: string
  classId?: number
  status?: string
}

// 学生输入类型
interface StudentBody {
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

// 路径参数类型
interface IdParams {
  id: number
}

// 获取学生列表
export async function getStudentsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const query = request.query as StudentQueryParams
    const { page, pageSize, keyword, classId, status } = query

    const result = await studentService.getStudentsService({
      page: page || 1,
      pageSize: pageSize || 10,
      keyword,
      classId,
      status,
    })

    return reply.send(success(paginate(result.list, result.total, result.page, result.pageSize)))
  } catch (err) {
    const message = err instanceof Error ? err.message : '获取学生列表失败'
    return reply.code(500).send(error(5000, message))
  }
}

// 获取学生详情
export async function getStudentController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const params = request.params as IdParams
    const { id } = params
    const student = await studentService.getStudentService(id)
    return reply.send(success(student))
  } catch (err) {
    const message = err instanceof Error ? err.message : '获取学生详情失败'
    const code = message.includes('学生不存在') ? 3002 : 5000
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}

// 创建学生
export async function createStudentController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body = request.body as StudentBody
    const { code, name, gender, classId, enrollYear, status } = body

    // 必填字段校验
    if (!code || !name || !gender || !classId || !enrollYear || !status) {
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

    const student = await studentService.createStudentService(body)
    return reply.send(success({ id: student.id }, '添加成功'))
  } catch (err) {
    const message = err instanceof Error ? err.message : '创建学生失败'
    const code = message.includes('学号已存在') ? 3001 : (message.includes('班级不存在') ? 5002 : 5000)
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}

// 更新学生
export async function updateStudentController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const params = request.params as IdParams
    const body = request.body as Partial<StudentBody>
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

    await studentService.updateStudentService(id, body)
    return reply.send(success(null, '修改成功'))
  } catch (err) {
    const message = err instanceof Error ? err.message : '更新学生失败'
    let code = 5000
    if (message.includes('学生不存在')) code = 3002
    else if (message.includes('学号已存在')) code = 3001
    else if (message.includes('班级不存在')) code = 5002
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}

// 删除学生
export async function deleteStudentController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const params = request.params as IdParams
    const { id } = params
    const result = await studentService.deleteStudentService(id)
    return reply.send(success(null, result.message))
  } catch (err) {
    const message = err instanceof Error ? err.message : '删除学生失败'
    const code = message.includes('学生不存在') ? 3002 : 5000
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}