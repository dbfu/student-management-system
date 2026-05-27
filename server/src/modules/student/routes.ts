import { FastifyInstance } from 'fastify'
import { success, paginate } from '../../shared/utils/response'

export async function studentRoutes(fastify: FastifyInstance) {
  // 获取学生列表
  fastify.get('/', async (request, reply) => {
    // TODO: 实现学生列表查询
    return reply.send(success(paginate([], 0, 1, 10)))
  })

  // 获取学生详情
  fastify.get('/:id', async (request, reply) => {
    // TODO: 实现学生详情查询
    return reply.send(success(null))
  })

  // 新增学生
  fastify.post('/', async (request, reply) => {
    // TODO: 实现新增学生
    return reply.send(success({ id: 1 }, '添加成功'))
  })

  // 修改学生
  fastify.put('/:id', async (request, reply) => {
    // TODO: 实现修改学生
    return reply.send(success(null, '修改成功'))
  })

  // 删除学生
  fastify.delete('/:id', async (request, reply) => {
    // TODO: 实现删除学生
    return reply.send(success(null, '删除成功'))
  })
}