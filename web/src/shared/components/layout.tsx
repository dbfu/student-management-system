import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'
import Header from './header'

interface LayoutProps {
  title: string
}

export default function Layout({ title }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Header title={title} />
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}