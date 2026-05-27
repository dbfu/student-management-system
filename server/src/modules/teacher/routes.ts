import { FastifyInstance } from 'fastify'
import { success, paginate } from '../../shared/utils/response'

export async function teacherRoutes(fastify: FastifyInstance) {
  // 获取教师列表
  fastify.get('/', async (request, reply) => {
    // TODO: 实现教师列表查询
    return reply.send(success(paginate([], 0, 1, 10)))
  })

  // 获取教师详情
  fastify.get('/:id', async (request, reply) => {
    // TODO: 实现教师详情查询
    return reply.send(success(null))
  })

  // 新增教师
  fastify.post('/', async (request, reply) => {
    // TODO: 实现新增教师
    return reply.send(success({ id: 1 }, '添加成功'))
  })

  // 修改教师
  fastify.put('/:id', async (request, reply) => {
    // TODO: 实现修改教师
    return reply.send(success(null, '修改成功'))
  })

  // 删除教师
  fastify.delete('/:id', async (request, reply) => {
    // TODO: 实现删除教师
    return reply.send(success(null, '删除成功'))
  })
}