import { College, TeacherQueryParams } from '../../shared/types'

interface TeacherFiltersProps {
  params: TeacherQueryParams
  colleges: College[]
  onSearch: (keyword: string) => void
  onFilter: (key: string, value: string | number | undefined) => void
  onAddClick: () => void
}

// 职称选项
const TITLE_OPTIONS = [
  { value: '教授', label: '教授' },
  { value: '副教授', label: '副教授' },
  { value: '讲师', label: '讲师' },
  { value: '助教', label: '助教' },
]

export function TeacherFilters({ params, colleges, onSearch, onFilter, onAddClick }: TeacherFiltersProps) {
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
              placeholder="搜索工号或姓名..."
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

        {/* 职称筛选 */}
        <select
          className="form-select w-auto"
          value={params.title || ''}
          onChange={(e) => onFilter('title', e.target.value || undefined)}
        >
          <option value="">全部职称</option>
          {TITLE_OPTIONS.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>

        {/* 操作按钮 */}
        <button
          onClick={onAddClick}
          className="btn btn-primary flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
          </svg>
          新增教师
        </button>
      </div>
    </div>
  )
}