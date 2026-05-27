import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './shared/store/auth-store'
import { Layout } from './shared/components'

// 页面组件
import LoginPage from './pages/login'
import DashboardPage from './pages/dashboard'
import StudentListPage from './pages/students'
import TeacherListPage from './pages/teachers'
import ClassListPage from './pages/classes'

// 404页面
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

      {/* 受保护的路由 - 使用Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout title="首页仪表盘" />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
      </Route>

      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <Layout title="学生管理" />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentListPage />} />
      </Route>

      <Route
        path="/teachers"
        element={
          <ProtectedRoute>
            <Layout title="教师管理" />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherListPage />} />
      </Route>

      <Route
        path="/classes"
        element={
          <ProtectedRoute>
            <Layout title="班级管理" />
          </ProtectedRoute>
        }
      >
        <Route index element={<ClassListPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App