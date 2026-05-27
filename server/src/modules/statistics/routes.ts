import { FastifyInstance } from 'fastify'
import {
  getDashboardStatisticsController,
  getStudentStatisticsController,
} from './controller'
import { authMiddleware } from '../../shared/utils/response'

export async function statisticsRoutes(fastify: FastifyInstance) {
  // 首页统计
  fastify.get('/dashboard', { onRequest: authMiddleware }, getDashboardStatisticsController)

  // 学生统计
  fastify.get('/students', { onRequest: authMiddleware }, getStudentStatisticsController)
}