import { FastifyError, FastifyRequest, FastifyReply } from 'fastify'

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const statusCode = error.statusCode || 500

  // JWT 错误
  if (error.message.includes('jwt') || error.message.includes('token')) {
    return reply.code(401).send({
      code: 1002,
      data: null,
      message: '认证失败：token无效或已过期',
    })
  }

  // 参数校验错误
  if (error.validation) {
    return reply.code(400).send({
      code: 1001,
      data: null,
      message: `参数错误：${error.message}`,
    })
  }

  // 业务错误（包含自定义 code）
  if (error.message.includes('已存在') || error.message.includes('不存在')) {
    return reply.code(400).send({
      code: statusCode,
      data: null,
      message: error.message,
    })
  }

  // 服务器内部错误
  request.log.error(error)
  return reply.code(500).send({
    code: 5000,
    data: null,
    message: '服务器内部错误',
  })
}