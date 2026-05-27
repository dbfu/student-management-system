import { FastifyInstance } from 'fastify'
import {
  getClassesController,
  getClassController,
  createClassController,
  updateClassController,
  deleteClassController,
  getClassStudentsController,
} from './controller'
import { authMiddleware } from '../../shared/utils/response'

export async function classRoutes(fastify: FastifyInstance) {
  // 获取班级列表
  fastify.get('/', { onRequest: authMiddleware }, getClassesController)

  // 获取班级详情
  fastify.get('/:id', { onRequest: authMiddleware }, getClassController)

  // 新增班级
  fastify.post('/', { onRequest: authMiddleware }, createClassController)

  // 修改班级
  fastify.put('/:id', { onRequest: authMiddleware }, updateClassController)

  // 删除班级
  fastify.delete('/:id', { onRequest: authMiddleware }, deleteClassController)

  // 获取班级学生列表
  fastify.get('/:id/students', { onRequest: authMiddleware }, getClassStudentsController)
}