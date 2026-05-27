interface StudentStatsProps {
  total: number
  studying: number
  suspended: number
  graduated: number
}

export function StudentStats({ total, studying, suspended, graduated }: StudentStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="card p-4">
        <p className="text-sm text-gray-500 mb-1">总学生数</p>
        <p className="text-2xl font-bold text-primary">{total}</p>
      </div>
      <div className="card p-4">
        <p className="text-sm text-gray-500 mb-1">在读学生</p>
        <p className="text-2xl font-bold text-green-600">{studying}</p>
      </div>
      <div className="card p-4">
        <p className="text-sm text-gray-500 mb-1">休学学生</p>
        <p className="text-2xl font-bold text-orange-600">{suspended}</p>
      </div>
      <div className="card p-4">
        <p className="text-sm text-gray-500 mb-1">已毕业</p>
        <p className="text-2xl font-bold text-gray-400">{graduated}</p>
      </div>
    </div>
  )
}