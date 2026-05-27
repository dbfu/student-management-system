import { FastifyInstance } from 'fastify'
import {
  loginController,
  getCurrentUserController,
  changePasswordController,
  logoutController,
} from './controller'

export async function authRoutes(fastify: FastifyInstance) {
  // 登录
  fastify.post('/login', loginController)

  // 获取当前用户信息
  fastify.get('/me', getCurrentUserController)

  // 修改密码
  fastify.put('/password', changePasswordController)

  // 退出登录
  fastify.post('/logout', logoutController)
}