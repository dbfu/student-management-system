// 通用响应类型
export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}

// 分页请求参数
export interface PaginationParams {
  page?: number
  pageSize?: number
}

// 分页响应数据
export interface PaginationData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 用户类型
export interface User {
  id: number
  username: string
  name?: string
}

// 登录响应
export interface LoginResponse {
  token: string
  user: User
}

// 学院类型
export interface College {
  id: number
  name: string
}

// 专业类型
export interface Major {
  id: number
  name: string
  collegeId: number
  collegeName?: string
}

// 学生类型
export interface Student {
  id: number
  code: string
  name: string
  gender: string
  birthDate?: string
  phone?: string
  email?: string
  classId?: number
  className?: string
  collegeId?: number
  collegeName?: string
  majorId?: number
  majorName?: string
  enrollYear?: number
  status: string
  address?: string
  createdAt?: string
  updatedAt?: string
}

// 学生查询参数
export interface StudentQueryParams extends PaginationParams {
  keyword?: string
  classId?: number
  collegeId?: number
  majorId?: number
  status?: string
}

// 新增/编辑学生参数
export interface StudentFormData {
  code: string
  name: string
  gender: string
  birthDate?: string
  phone?: string
  email?: string
  classId: number
  enrollYear: number
  status?: string
  address?: string
}

// 教师类型
export interface Teacher {
  id: number
  code: string
  name: string
  gender: string
  phone?: string
  email?: string
  collegeId?: number
  collegeName?: string
  title: string
  status: string
  createdAt?: string
  updatedAt?: string
}

// 教师查询参数
export interface TeacherQueryParams extends PaginationParams {
  keyword?: string
  collegeId?: number
  title?: string
  status?: string
}

// 新增/编辑教师参数
export interface TeacherFormData {
  code: string
  name: string
  gender: string
  phone?: string
  email?: string
  collegeId: number
  title: string
  status?: string
}

// 班级类型
export interface Class {
  id: number
  code: string
  name: string
  collegeId: number
  collegeName?: string
  majorId: number
  majorName?: string
  grade: number
  teacherId?: number
  teacherName?: string
  studentCount?: number
  createdAt?: string
  updatedAt?: string
}

// 班级查询参数
export interface ClassQueryParams extends PaginationParams {
  keyword?: string
  collegeId?: number
  majorId?: number
  grade?: number
}

// 新增/编辑班级参数
export interface ClassFormData {
  code: string
  name: string
  collegeId: number
  majorId: number
  grade: number
  teacherId?: number
}

// 首页统计数据
export interface DashboardStats {
  studentCount: number
  teacherCount: number
  classCount: number
  courseCount: number
}