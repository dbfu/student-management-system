import { Class } from '../../shared/types'
import { Pagination, Loading } from '../../shared/components'

interface ClassTableProps {
  classes: Class[]
  loading: boolean
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onEdit: (classItem: Class) => void
  onDelete: (classItem: Class) => void
  onViewStudents: (classItem: Class) => void
}

export function ClassTable({
  classes,
  loading,
  page,
  pageSize,
  total,
  onPageChange,
  onEdit,
  onDelete,
  onViewStudents,
}: ClassTableProps) {
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
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">班级编号</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">班级名称</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 hidden md:table-cell">学院</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 hidden sm:table-cell">专业</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">年级</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600 hidden lg:table-cell">班主任</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">人数</th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {classes.map((classItem) => (
            <tr key={classItem.id} className="table-row">
              <td className="px-6 py-4 text-sm text-gray-800">{classItem.code}</td>
              <td className="px-6 py-4 text-sm text-gray-800 font-medium">{classItem.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{classItem.collegeName}</td>
              <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">{classItem.majorName}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 ${
                  classItem.grade === 2024 ? 'bg-primary/10 text-primary' :
                  classItem.grade === 2023 ? 'bg-orange-100 text-orange-600' :
                  'bg-purple-100 text-purple-600'
                } text-xs rounded-full`}>
                  {classItem.grade}级
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">{classItem.teacherName || '-'}</td>
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-gray-800">{classItem.studentCount || 0}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onViewStudents(classItem)}
                    className="btn-action hover:bg-purple-50"
                    aria-label="查看学生"
                  >
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => onEdit(classItem)}
                    className="btn-action hover:bg-primary/10"
                    aria-label="编辑"
                  >
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(classItem)}
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