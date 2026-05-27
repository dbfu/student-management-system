import { FastifyRequest, FastifyReply } from 'fastify'
import { success, error } from '../../shared/utils/response'
import * as statisticsService from './service'

// 查询参数类型
interface StatisticsQueryParams {
  dimension?: string
}

// 首页统计
export async function getDashboardStatisticsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const data = await statisticsService.getDashboardStatisticsService()
    return reply.send(success(data))
  } catch (err) {
    const message = err instanceof Error ? err.message : '获取统计数据失败'
    return reply.code(500).send(error(5000, message))
  }
}

// 学生统计
export async function getStudentStatisticsController(
  request: FastifyRequest<{ Querystring: StatisticsQueryParams }>,
  reply: FastifyReply
) {
  try {
    const { dimension } = request.query

    if (!dimension) {
      return reply.code(400).send(error(1001, '请指定统计维度'))
    }

    const data = await statisticsService.getStudentStatisticsService(dimension)
    return reply.send(success(data))
  } catch (err) {
    const message = err instanceof Error ? err.message : '获取统计数据失败'
    return reply.code(500).send(error(5000, message))
  }
}