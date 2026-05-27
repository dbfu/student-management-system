import { FastifyRequest, FastifyReply } from 'fastify'
import { success, error, paginate } from '../../shared/utils/response'
import * as classService from './service'

// 查询参数类型
interface ClassQueryParams {
  page?: number
  pageSize?: number
  keyword?: string
  collegeId?: number
  majorId?: number
}

// 班级输入类型
interface ClassBody {
  code: string
  name: string
  collegeId: number
  majorId: number
  grade: number
  teacherId?: number
}

// 路径参数类型
interface IdParams {
  id: number
}

// 学生列表查询参数
interface StudentsQueryParams {
  page?: number
  pageSize?: number
}

// 获取班级列表
export async function getClassesController(
  request: FastifyRequest<{ Querystring: ClassQueryParams }>,
  reply: FastifyReply
) {
  try {
    const { page, pageSize, keyword, collegeId, majorId } = request.query

    const result = await classService.getClassesService({
      page: page || 1,
      pageSize: pageSize || 10,
      keyword,
      collegeId,
      majorId,
    })

    return reply.send(success(paginate(result.list, result.total, result.page, result.pageSize)))
  } catch (err) {
    const message = err instanceof Error ? err.message : '获取班级列表失败'
    return reply.code(500).send(error(5000, message))
  }
}

// 获取班级详情
export async function getClassController(
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params
    const classInfo = await classService.getClassService(id)
    return reply.send(success(classInfo))
  } catch (err) {
    const message = err instanceof Error ? err.message : '获取班级详情失败'
    const code = message.includes('班级不存在') ? 5002 : 5000
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}

// 创建班级
export async function createClassController(
  request: FastifyRequest<{ Body: ClassBody }>,
  reply: FastifyReply
) {
  try {
    const { code, name, collegeId, majorId, grade } = request.body

    // 必填字段校验
    if (!code || !name || !collegeId || !majorId || !grade) {
      return reply.code(400).send(error(1001, '必填字段不能为空'))
    }

    const classInfo = await classService.createClassService(request.body)
    return reply.send(success({ id: classInfo.id }, '添加成功'))
  } catch (err) {
    const message = err instanceof Error ? err.message : '创建班级失败'
    let code = 5000
    if (message.includes('班级编号已存在')) code = 5001
    else if (message.includes('学院不存在')) code = 5002
    else if (message.includes('专业不存在')) code = 5002
    else if (message.includes('教师不存在')) code = 4002
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}

// 更新班级
export async function updateClassController(
  request: FastifyRequest<{ Params: IdParams; Body: Partial<ClassBody> }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params

    await classService.updateClassService(id, request.body)
    return reply.send(success(null, '修改成功'))
  } catch (err) {
    const message = err instanceof Error ? err.message : '更新班级失败'
    let code = 5000
    if (message.includes('班级不存在')) code = 5002
    else if (message.includes('班级编号已存在')) code = 5001
    else if (message.includes('学院不存在')) code = 5002
    else if (message.includes('专业不存在')) code = 5002
    else if (message.includes('教师不存在')) code = 4002
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}

// 删除班级
export async function deleteClassController(
  request: FastifyRequest<{ Params: IdParams }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params
    const result = await classService.deleteClassService(id)
    return reply.send(success(null, result.message))
  } catch (err) {
    const message = err instanceof Error ? err.message : '删除班级失败'
    let code = 5000
    if (message.includes('班级不存在')) code = 5002
    else if (message.includes('班级下存在学生')) code = 1001
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}

// 获取班级学生列表
export async function getClassStudentsController(
  request: FastifyRequest<{ Params: IdParams; Querystring: StudentsQueryParams }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params
    const { page, pageSize } = request.query

    const result = await classService.getClassStudentsService(id, page || 1, pageSize || 10)
    return reply.send(success(paginate(result.list, result.total, result.page, result.pageSize)))
  } catch (err) {
    const message = err instanceof Error ? err.message : '获取班级学生列表失败'
    const code = message.includes('班级不存在') ? 5002 : 5000
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}