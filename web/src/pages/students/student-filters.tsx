import { College } from '../../shared/types'
import { StudentQueryParams } from '../../shared/types'

interface StudentFiltersProps {
  params: StudentQueryParams
  colleges: College[]
  onSearch: (keyword: string) => void
  onFilter: (key: string, value: string | number | undefined) => void
  onAddClick: () => void
}

// 学生状态选项
const STATUS_OPTIONS = [
  { value: '在读', label: '在读' },
  { value: '休学', label: '休学' },
  { value: '毕业', label: '毕业' },
  { value: '退学', label: '退学' },
]

export function StudentFilters({ params, colleges, onSearch, onFilter, onAddClick }: StudentFiltersProps) {
  return (
    <div className="card p-6">
      <div className="flex flex-wrap gap-4 items-center">
        {/* 搜索 */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              placeholder="搜索学号或姓名..."
              value={params.keyword}
              onChange={(e) => onSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* 学院筛选 */}
        <select
          className="form-select w-auto"
          value={params.collegeId || ''}
          onChange={(e) => onFilter('collegeId', e.target.value ? Number(e.target.value) : undefined)}
        >
          <option value="">全部学院</option>
          {colleges.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {/* 状态筛选 */}
        <select
          className="form-select w-auto"
          value={params.status || ''}
          onChange={(e) => onFilter('status', e.target.value || undefined)}
        >
          <option value="">全部状态</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <button
            onClick={onAddClick}
            className="btn btn-primary flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
            新增学生
          </button>
          <button className="btn btn-secondary flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v4h4"/>
            </svg>
            导入
          </button>
          <button className="btn btn-secondary flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            导出
          </button>
        </div>
      </div>
    </div>
  )
}