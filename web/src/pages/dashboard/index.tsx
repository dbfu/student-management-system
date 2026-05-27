import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loading } from '../../shared/components'
import { getDashboardStats } from '../../shared/services/common-service'
import { DashboardStats } from '../../shared/types'

// 统计卡片数据（用于mock数据展示）
const mockStats: DashboardStats = {
  studentCount: 1285,
  teacherCount: 86,
  classCount: 42,
  courseCount: 128,
}

// 图标组件
const StatIcon = ({ type }: { type: 'students' | 'teachers' | 'classes' | 'courses' }) => {
  const icons = {
    students: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    ),
    teachers: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    classes: (
      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    courses: (
      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
    ),
  }
  return <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">{icons[type]}</div>
}

// 快速操作图标
const QuickActionIcon = ({ type }: { type: 'student' | 'teacher' | 'class' | 'import' }) => {
  const icons = {
    student: (
      <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
      </svg>
    ),
    teacher: (
      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
      </svg>
    ),
    class: (
      <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
      </svg>
    ),
    import: (
      <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v4h4"/>
      </svg>
    ),
  }
  return icons[type]
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(mockStats)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats()
        setStats(data)
      } catch {
        // 使用mock数据
        setStats(mockStats)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return <Loading text="加载统计数据..." />
  }

  const statCards = [
    {
      type: 'students',
      label: '学生总数',
      value: stats.studentCount,
      color: 'primary',
      bg: 'bg-primary/10',
    },
    {
      type: 'teachers',
      label: '教师总数',
      value: stats.teacherCount,
      color: 'green',
      bg: 'bg-green-100',
    },
    {
      type: 'classes',
      label: '班级数量',
      value: stats.classCount,
      color: 'orange',
      bg: 'bg-orange-100',
    },
    {
      type: 'courses',
      label: '课程数量',
      value: stats.courseCount,
      color: 'purple',
      bg: 'bg-purple-100',
    },
  ]

  const quickActions = [
    { type: 'student', label: '新增学生', href: '/students', bg: 'bg-primary/5', hover: 'hover:bg-primary/10' },
    { type: 'teacher', label: '新增教师', href: '/teachers', bg: 'bg-green-50', hover: 'hover:bg-green-100' },
    { type: 'class', label: '新增班级', href: '/classes', bg: 'bg-orange-50', hover: 'hover:bg-orange-100' },
    { type: 'import', label: '导入数据', href: '#', bg: 'bg-purple-50', hover: 'hover:bg-purple-100' },
  ]

  // Mock数据动态
  const recentActivities = [
    { type: 'student', title: '新增学生：张三 (计算机学院)', time: '2026-05-27 10:30', status: '新增' },
    { type: 'class', title: '更新班级：软件工程2024级1班', time: '2026-05-27 09:15', status: '更新' },
    { type: 'teacher', title: '新增教师：李教授 (人工智能学院)', time: '2026-05-26 16:45', status: '新增' },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.type} className="stat-card cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center`}>
                <StatIcon type={card.type as 'students' | 'teachers' | 'classes' | 'courses'} />
              </div>
              <span className="text-sm text-green-600 font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                </svg>
                {Math.floor(Math.random() * 15)}%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{card.value.toLocaleString()}</h3>
            <p className="text-sm text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-800 mb-4">快速操作</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.type}
              to={action.href}
              className={`flex items-center justify-center p-4 ${action.bg} ${action.hover} rounded-xl transition-colors group`}
            >
              <QuickActionIcon type={action.type as 'student' | 'teacher' | 'class' | 'import'} />
              <span className={`text-sm font-medium text-${action.type === 'student' ? 'primary' : action.type === 'teacher' ? 'green-600' : action.type === 'class' ? 'orange-600' : 'purple-600'}`}>
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">最新数据动态</h3>
          <a href="#" className="text-sm text-primary hover:text-primary-dark transition-colors">
            查看全部
          </a>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className={`w-10 h-10 ${
                activity.type === 'student' ? 'bg-primary/10' :
                activity.type === 'teacher' ? 'bg-green-100' :
                'bg-orange-100'
              } rounded-full flex items-center justify-center mr-4`}>
                {activity.type === 'student' && (
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                )}
                {activity.type === 'teacher' && (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                )}
                {activity.type === 'class' && (
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <span className={`px-2 py-1 ${
                activity.status === '新增' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
              } text-xs rounded-full`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}