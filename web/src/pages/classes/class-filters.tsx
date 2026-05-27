import { College, Major, ClassQueryParams } from '../../shared/types'

interface ClassFiltersProps {
  params: ClassQueryParams
  colleges: College[]
  majors: Major[]
  onSearch: (keyword: string) => void
  onFilter: (key: string, value: string | number | undefined) => void
  onAddClick: () => void
}

// 年级选项
const GRADE_OPTIONS = [
  { value: 2024, label: '2024级' },
  { value: 2023, label: '2023级' },
  { value: 2022, label: '2022级' },
  { value: 2021, label: '2021级' },
]

export function ClassFilters({ params, colleges, majors, onSearch, onFilter, onAddClick }: ClassFiltersProps) {
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
              placeholder="搜索班级编号或名称..."
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

        {/* 专业筛选 */}
        <select
          className="form-select w-auto"
          value={params.majorId || ''}
          onChange={(e) => onFilter('majorId', e.target.value ? Number(e.target.value) : undefined)}
        >
          <option value="">全部专业</option>
          {majors.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>

        {/* 年级筛选 */}
        <select
          className="form-select w-auto"
          value={params.grade || ''}
          onChange={(e) => onFilter('grade', e.target.value ? Number(e.target.value) : undefined)}
        >
          <option value="">全部年级</option>
          {GRADE_OPTIONS.map((g) => (
            <option key={g.value} value={g.value}>{g.label}</option>
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
          新增班级
        </button>
      </div>
    </div>
  )
}