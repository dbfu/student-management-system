import { FastifyInstance } from 'fastify'
import {
  getTeachersController,
  getTeacherController,
  createTeacherController,
  updateTeacherController,
  deleteTeacherController,
  assignCoursesController,
} from './controller'
import { authMiddleware } from '../../shared/utils/response'

export async function teacherRoutes(fastify: FastifyInstance) {
  // 获取教师列表
  fastify.get('/', { onRequest: authMiddleware }, getTeachersController)

  // 获取教师详情
  fastify.get('/:id', { onRequest: authMiddleware }, getTeacherController)

  // 新增教师
  fastify.post('/', { onRequest: authMiddleware }, createTeacherController)

  // 修改教师
  fastify.put('/:id', { onRequest: authMiddleware }, updateTeacherController)

  // 删除教师
  fastify.delete('/:id', { onRequest: authMiddleware }, deleteTeacherController)

  // 分配课程
  fastify.post('/:id/courses', { onRequest: authMiddleware }, assignCoursesController)
}