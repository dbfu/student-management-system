import { FastifyInstance } from 'fastify'
import { getCollegesController, getMajorsController } from './controller'
import { authMiddleware } from '../../shared/utils/response'

export async function collegeRoutes(fastify: FastifyInstance) {
  // 获取学院列表
  fastify.get('/colleges', { onRequest: authMiddleware }, getCollegesController)

  // 获取专业列表
  fastify.get('/majors', { onRequest: authMiddleware }, getMajorsController)
}