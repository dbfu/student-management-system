import { FastifyInstance } from 'fastify'
import { success } from '../../shared/utils/response'

export async function statisticsRoutes(fastify: FastifyInstance) {
  // 首页统计
  fastify.get('/dashboard', async (request, reply) => {
    // TODO: 实现首页统计
    return reply.send(success({
      studentCount: 0,
      teacherCount: 0,
      classCount: 0,
      courseCount: 0,
    }))
  })
}