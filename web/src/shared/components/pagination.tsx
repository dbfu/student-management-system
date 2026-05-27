interface PaginationProps {
  current: number
  total: number
  pageSize: number
  onChange: (page: number) => void
}

export default function Pagination({ current, total, pageSize, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)
  const start = (current - 1) * pageSize + 1
  const end = Math.min(current * pageSize, total)

  // 生成页码数组
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (current >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
      <p className="text-sm text-gray-500">
        显示 {start}-{end} 条，共 {total} 条
      </p>
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          disabled={current === 1}
          onClick={() => onChange(current - 1)}
        >
          上一页
        </button>
        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <span key={index} className="text-sm text-gray-400">...</span>
          ) : (
            <button
              key={index}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                page === current
                  ? 'bg-primary text-white'
                  : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              } transition-colors`}
              onClick={() => onChange(page as number)}
            >
              {page}
            </button>
          )
        )}
        <button
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          disabled={current === totalPages}
          onClick={() => onChange(current + 1)}
        >
          下一页
        </button>
      </div>
    </div>
  )
}