import { FastifyRequest, FastifyReply } from 'fastify'
import { success, error } from '../../shared/utils/response'
import * as collegeService from './service'

// 获取学院列表
export async function getCollegesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const colleges = await collegeService.getCollegesService()
    return reply.send(success(colleges))
  } catch (err) {
    const message = err instanceof Error ? err.message : '获取学院列表失败'
    return reply.code(500).send(error(5000, message))
  }
}

// 获取专业列表
export async function getMajorsController(
  request: FastifyRequest<{ Querystring: { collegeId?: number } }>,
  reply: FastifyReply
) {
  try {
    const { collegeId } = request.query
    const majors = await collegeService.getMajorsService(collegeId)
    return reply.send(success(majors))
  } catch (err) {
    const message = err instanceof Error ? err.message : '获取专业列表失败'
    return reply.code(500).send(error(5000, message))
  }
}