import request from '../utils/request'
import { ApiResponse, LoginResponse, User } from '../types'

// 登录
export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await request.post<ApiResponse<LoginResponse>>('/auth/login', {
    username,
    password,
  })
  return response.data.data
}

// 获取当前用户信息
export async function getCurrentUser(): Promise<User> {
  const response = await request.get<ApiResponse<User>>('/auth/me')
  return response.data.data
}

// 修改密码
export async function changePassword(oldPassword: string, newPassword: string): Promise<void> {
  await request.put<ApiResponse>('/auth/password', {
    oldPassword,
    newPassword,
  })
}

// 退出登录
export async function logout(): Promise<void> {
  await request.post<ApiResponse>('/auth/logout')
}