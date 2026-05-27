import { FastifyInstance } from 'fastify'
import { success, paginate } from '../../shared/utils/response'

export async function classRoutes(fastify: FastifyInstance) {
  // 获取班级列表
  fastify.get('/', async (request, reply) => {
    // TODO: 实现班级列表查询
    return reply.send(success(paginate([], 0, 1, 10)))
  })

  // 获取班级详情
  fastify.get('/:id', async (request, reply) => {
    // TODO: 实现班级详情查询
    return reply.send(success(null))
  })

  // 新增班级
  fastify.post('/', async (request, reply) => {
    // TODO: 实现新增班级
    return reply.send(success({ id: 1 }, '添加成功'))
  })

  // 修改班级
  fastify.put('/:id', async (request, reply) => {
    // TODO: 实现修改班级
    return reply.send(success(null, '修改成功'))
  })

  // 删除班级
  fastify.delete('/:id', async (request, reply) => {
    // TODO: 实现删除班级
    return reply.send(success(null, '删除成功'))
  })

  // 获取班级学生列表
  fastify.get('/:id/students', async (request, reply) => {
    // TODO: 实现班级学生列表查询
    return reply.send(success(paginate([], 0, 1, 10)))
  })
}