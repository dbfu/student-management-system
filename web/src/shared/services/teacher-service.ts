import request from '../utils/request'
import { ApiResponse, PaginationData, Teacher, TeacherQueryParams, TeacherFormData } from '../types'

// 获取教师列表
export async function getTeachers(params: TeacherQueryParams): Promise<PaginationData<Teacher>> {
  const response = await request.get<ApiResponse<PaginationData<Teacher>>>('/teachers', { params })
  return response.data.data
}

// 获取教师详情
export async function getTeacher(id: number): Promise<Teacher> {
  const response = await request.get<ApiResponse<Teacher>>(`/teachers/${id}`)
  return response.data.data
}

// 新增教师
export async function createTeacher(data: TeacherFormData): Promise<Teacher> {
  const response = await request.post<ApiResponse<Teacher>>('/teachers', data)
  return response.data.data
}

// 修改教师
export async function updateTeacher(id: number, data: Partial<TeacherFormData>): Promise<Teacher> {
  const response = await request.put<ApiResponse<Teacher>>(`/teachers/${id}`, data)
  return response.data.data
}

// 删除教师
export async function deleteTeacher(id: number): Promise<void> {
  await request.delete<ApiResponse>(`/teachers/${id}`)
}

// 分配课程
export async function assignCourses(id: number, courseIds: number[]): Promise<void> {
  await request.post<ApiResponse>(`/teachers/${id}/courses`, { courseIds })
}