import { FastifyInstance } from 'fastify'
import {
  getStudentsController,
  getStudentController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
} from './controller'
import { authMiddleware } from '../../shared/utils/response'

export async function studentRoutes(fastify: FastifyInstance) {
  // 获取学生列表
  fastify.get('/', { onRequest: authMiddleware }, getStudentsController)

  // 获取学生详情
  fastify.get('/:id', { onRequest: authMiddleware }, getStudentController)

  // 新增学生
  fastify.post('/', { onRequest: authMiddleware }, createStudentController)

  // 修改学生
  fastify.put('/:id', { onRequest: authMiddleware }, updateStudentController)

  // 删除学生
  fastify.delete('/:id', { onRequest: authMiddleware }, deleteStudentController)
}