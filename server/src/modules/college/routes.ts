import { FastifyInstance } from 'fastify'
import { getCollegesController, getMajorsController } from './controller'
import { authMiddleware } from '../../shared/utils/response'

export async function collegeRoutes(fastify: FastifyInstance) {
  // 获取学院列表 - 路径: /api/colleges
  fastify.get('/', { onRequest: authMiddleware }, getCollegesController)

  // 获取专业列表 - 路径: /api/colleges/majors
  fastify.get('/majors', { onRequest: authMiddleware }, getMajorsController)
}