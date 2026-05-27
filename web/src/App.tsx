import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './shared/store/auth-store'

// 页面组件（暂时使用占位组件）
const LoginPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="card w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">学生管理系统</h1>
      <p className="text-gray-500 text-center">登录页面（待开发）</p>
    </div>
  </div>
)

const DashboardPage = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="card">
      <h1 className="text-2xl font-bold mb-4">仪表盘</h1>
      <p className="text-gray-500">首页仪表盘（待开发）</p>
    </div>
  </div>
)

const StudentListPage = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="card">
      <h1 className="text-2xl font-bold mb-4">学生管理</h1>
      <p className="text-gray-500">学生列表页面（待开发）</p>
    </div>
  </div>
)

const TeacherListPage = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="card">
      <h1 className="text-2xl font-bold mb-4">教师管理</h1>
      <p className="text-gray-500">教师列表页面（待开发）</p>
    </div>
  </div>
)

const ClassListPage = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="card">
      <h1 className="text-2xl font-bold mb-4">班级管理</h1>
      <p className="text-gray-500">班级列表页面（待开发）</p>
    </div>
  </div>
)

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="card text-center">
      <h1 className="text-4xl font-bold text-gray-400 mb-4">404</h1>
      <p className="text-gray-500">页面不存在</p>
    </div>
  </div>
)

// 受保护的路由组件
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

function App() {
  return (
    <Routes>
      {/* 公开路由 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 受保护的路由 */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <StudentListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teachers"
        element={
          <ProtectedRoute>
            <TeacherListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/classes"
        element={
          <ProtectedRoute>
            <ClassListPage />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App