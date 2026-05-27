import request from '../utils/request'
import { ApiResponse, College, Major, DashboardStats } from '../types'

// 获取学院列表
export async function getColleges(): Promise<College[]> {
  const response = await request.get<ApiResponse<College[]>>('/colleges')
  return response.data.data
}

// 获取专业列表
export async function getMajors(collegeId?: number): Promise<Major[]> {
  const response = await request.get<ApiResponse<Major[]>>('/majors', {
    params: collegeId ? { collegeId } : undefined,
  })
  return response.data.data
}

// 获取首页统计数据
export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await request.get<ApiResponse<DashboardStats>>('/statistics/dashboard')
  return response.data.data
}