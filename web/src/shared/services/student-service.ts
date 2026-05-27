import request from '../utils/request'
import { ApiResponse, PaginationData, Student, StudentQueryParams, StudentFormData } from '../types'

// 获取学生列表
export async function getStudents(params: StudentQueryParams): Promise<PaginationData<Student>> {
  const response = await request.get<ApiResponse<PaginationData<Student>>>('/students', { params })
  return response.data.data
}

// 获取学生详情
export async function getStudent(id: number): Promise<Student> {
  const response = await request.get<ApiResponse<Student>>(`/students/${id}`)
  return response.data.data
}

// 新增学生
export async function createStudent(data: StudentFormData): Promise<Student> {
  const response = await request.post<ApiResponse<Student>>('/students', data)
  return response.data.data
}

// 修改学生
export async function updateStudent(id: number, data: Partial<StudentFormData>): Promise<Student> {
  const response = await request.put<ApiResponse<Student>>(`/students/${id}`, data)
  return response.data.data
}

// 删除学生
export async function deleteStudent(id: number): Promise<void> {
  await request.delete<ApiResponse>(`/students/${id}`)
}

// 导出学生
export async function exportStudents(params: StudentQueryParams): Promise<void> {
  const response = await request.get('/students/export', {
    params,
    responseType: 'blob',
  })
  // 创建下载链接
  const blob = new Blob([response.data])
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `students_${new Date().toISOString().split('T')[0]}.xlsx`
  link.click()
  window.URL.revokeObjectURL(url)
}