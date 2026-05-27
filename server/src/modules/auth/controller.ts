import { FastifyRequest, FastifyReply } from 'fastify'
import { success, error, authMiddleware } from '../../shared/utils/response'
import * as authService from './service'

// 登录请求体类型
interface LoginBody {
  username: string
  password: string
}

// 修改密码请求体类型
interface ChangePasswordBody {
  oldPassword: string
  newPassword: string
}

// 登录
export async function loginController(
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply
) {
  try {
    const { username, password } = request.body

    // 参数校验
    if (!username || !password) {
      return reply.code(400).send(error(1001, '用户名和密码不能为空'))
    }

    // 验证登录
    const user = await authService.loginService({ username, password })

    // 生成JWT token
    const token = await reply.jwtSign({
      userId: user.id,
      username: user.username,
    })

    return reply.send(success({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
    }, '登录成功'))
  } catch (err) {
    const message = err instanceof Error ? err.message : '登录失败'
    const code = message.includes('用户名或密码错误') ? 2002 : 5000
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}

// 获取当前用户信息
export async function getCurrentUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // JWT验证
    await request.jwtVerify()

    const payload = request.user as { userId: number }
    const user = await authService.getUserService(payload.userId)

    return reply.send(success(user))
  } catch (err) {
    return reply.code(401).send(error(1002, '未登录或token已过期'))
  }
}

// 修改密码
export async function changePasswordController(
  request: FastifyRequest<{ Body: ChangePasswordBody }>,
  reply: FastifyReply
) {
  try {
    // JWT验证
    await request.jwtVerify()

    const payload = request.user as { userId: number }
    const { oldPassword, newPassword } = request.body

    // 参数校验
    if (!oldPassword || !newPassword) {
      return reply.code(400).send(error(1001, '旧密码和新密码不能为空'))
    }

    if (newPassword.length < 6) {
      return reply.code(400).send(error(1001, '新密码长度不能少于6位'))
    }

    await authService.changePasswordService(payload.userId, {
      oldPassword,
      newPassword,
    })

    return reply.send(success(null, '密码修改成功'))
  } catch (err) {
    const message = err instanceof Error ? err.message : '密码修改失败'
    const code = message.includes('旧密码错误') ? 2002 : 5000
    return reply.code(code === 5000 ? 500 : 400).send(error(code, message))
  }
}

// 退出登录
export async function logoutController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // JWT验证
    await request.jwtVerify()

    // JWT token在客户端清除即可，服务端无需处理
    return reply.send(success(null, '退出成功'))
  } catch (err) {
    return reply.code(401).send(error(1002, '未登录或token已过期'))
  }
}