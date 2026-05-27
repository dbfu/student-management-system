import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import jwt from '@fastify/jwt'
import rateLimit from '@fastify/rate-limit'

import { authRoutes } from './modules/auth/routes'
import { studentRoutes } from './modules/student/routes'
import { teacherRoutes } from './modules/teacher/routes'
import { classRoutes } from './modules/class/routes'
import { collegeRoutes } from './modules/college/routes'
import { statisticsRoutes } from './modules/statistics/routes'

import { errorHandler } from './shared/middleware/error-handler'

const fastify = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  },
})

// 注册插件
async function registerPlugins() {
  // 安全头
  await fastify.register(helmet)

  // CORS
  await fastify.register(cors, {
    origin: [process.env.FRONTEND_URL || 'http://localhost:5173'],
    credentials: true,
  })

  // JWT
  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    sign: {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
  })

  // 速率限制
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  })
}

// 注册路由
async function registerRoutes() {
  // 健康检查
  fastify.get('/api/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() }
  })

  // 业务路由
  await fastify.register(authRoutes, { prefix: '/api/auth' })
  await fastify.register(studentRoutes, { prefix: '/api/students' })
  await fastify.register(teacherRoutes, { prefix: '/api/teachers' })
  await fastify.register(classRoutes, { prefix: '/api/classes' })
  await fastify.register(collegeRoutes, { prefix: '/api/colleges' })
  await fastify.register(statisticsRoutes, { prefix: '/api/statistics' })
}

// 错误处理
fastify.setErrorHandler(errorHandler)

// 启动服务
async function start() {
  try {
    await registerPlugins()
    await registerRoutes()

    const port = parseInt(process.env.PORT || '3000')
    await fastify.listen({ port, host: '0.0.0.0' })

    console.log(`🚀 Server running at http://localhost:${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

export default fastify
export { start }