import { FastifyInstance } from 'fastify'
import { success } from '../../shared/utils/response'

export async function collegeRoutes(fastify: FastifyInstance) {
  // 获取学院列表
  fastify.get('/colleges', async (request, reply) => {
    // TODO: 实现学院列表查询
    return reply.send(success([]))
  })

  // 获取专业列表
  fastify.get('/majors', async (request, reply) => {
    // TODO: 实现专业列表查询
    return reply.send(success([]))
  })
}