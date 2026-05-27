import { FastifyRequest, FastifyReply } from 'fastify'

export interface ApiResponse<T = any> {
  code: number
  data: T | null
  message: string
}

export function success<T>(data: T, message = 'success'): ApiResponse<T> {
  return {
    code: 0,
    data,
    message,
  }
}

export function error(code: number, message: string): ApiResponse<null> {
  return {
    code,
    data: null,
    message,
  }
}

export function paginate<T>(
  list: T[],
  total: number,
  page: number,
  pageSize: number
) {
  return {
    list,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

// JWT认证中间件 - 使用正确的类型签名
export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.code(401).send({
      code: 1002,
      data: null,
      message: '未登录或token已过期',
    })
  }
}