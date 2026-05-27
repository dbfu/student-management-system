import { Student } from '../../shared/types'
import { Pagination, StatusBadge, Loading } from '../../shared/components'

interface StudentTableProps {
  students: Student[]
  loading: boolean
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onEdit: (student: Student) => void
  onDelete: (student: Student) => void
}

export function StudentTable({
  students,
  loading,
  page,
  pageSize,
  total,
  onPageChange,
  onEdit,
  onDelete,
}: StudentTableProps) {
  if (loading) {
    return (
      <div className="card overflow-hidden">
        <Loading />
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">学号</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">姓名</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 hidden sm:table-cell">性别</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 hidden md:table-cell">班级</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">学籍状态</th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.map((student) => (
            <tr key={student.id} className="table-row cursor-pointer" onClick={() => onEdit(student)}>
              <td className="px-6 py-4 text-sm text-gray-800">{student.code}</td>
              <td className="px-6 py-4 text-sm text-gray-800 font-medium">{student.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">{student.gender}</td>
              <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{student.className || '-'}</td>
              <td className="px-6 py-4">
                <StatusBadge status={student.status} type="student" />
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); onEdit(student) }}
                    className="btn-action hover:bg-primary/10"
                    aria-label="编辑"
                  >
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(student) }}
                    className="btn-action hover:bg-red-50"
                    aria-label="删除"
                  >
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        current={page}
        total={total}
        pageSize={pageSize}
        onChange={onPageChange}
      />
    </div>
  )
}