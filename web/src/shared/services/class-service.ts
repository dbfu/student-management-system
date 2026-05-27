import request from '../utils/request'
import { ApiResponse, PaginationData, Class, ClassQueryParams, ClassFormData, Student } from '../types'

// 获取班级列表
export async function getClasses(params: ClassQueryParams): Promise<PaginationData<Class>> {
  const response = await request.get<ApiResponse<PaginationData<Class>>>('/classes', { params })
  return response.data.data
}

// 获取班级详情
export async function getClass(id: number): Promise<Class> {
  const response = await request.get<ApiResponse<Class>>(`/classes/${id}`)
  return response.data.data
}

// 新增班级
export async function createClass(data: ClassFormData): Promise<Class> {
  const response = await request.post<ApiResponse<Class>>('/classes', data)
  return response.data.data
}

// 修改班级
export async function updateClass(id: number, data: Partial<ClassFormData>): Promise<Class> {
  const response = await request.put<ApiResponse<Class>>(`/classes/${id}`, data)
  return response.data.data
}

// 删除班级
export async function deleteClass(id: number): Promise<void> {
  await request.delete<ApiResponse>(`/classes/${id}`)
}

// 获取班级学生列表
export async function getClassStudents(id: number): Promise<Student[]> {
  const response = await request.get<ApiResponse<Student[]>>(`/classes/${id}/students`)
  return response.data.data
}