import { FastifyInstance } from 'fastify'
import { success } from '../../shared/utils/response'

export async function authRoutes(fastify: FastifyInstance) {
  // 登录
  fastify.post('/login', async (request, reply) => {
    // TODO: 实现登录逻辑
    return reply.send(success({ token: 'placeholder', user: { id: 1, username: 'admin' } }, '登录成功'))
  })

  // 获取当前用户信息
  fastify.get('/me', async (request, reply) => {
    // TODO: 实现获取用户信息逻辑
    return reply.send(success({ id: 1, username: 'admin', name: '管理员' }))
  })

  // 修改密码
  fastify.put('/password', async (request, reply) => {
    // TODO: 实现修改密码逻辑
    return reply.send(success(null, '密码修改成功'))
  })

  // 退出登录
  fastify.post('/logout', async (request, reply) => {
    // TODO: 实现退出逻辑
    return reply.send(success(null, '退出成功'))
  })
}