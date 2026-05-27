interface ClassStatsProps {
  total: number
  grade2024: number
  grade2023: number
  grade2022: number
}

export function ClassStats({ total, grade2024, grade2023, grade2022 }: ClassStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="card p-4">
        <p className="text-sm text-gray-500 mb-1">总班级数</p>
        <p className="text-2xl font-bold text-primary">{total}</p>
      </div>
      <div className="card p-4">
        <p className="text-sm text-gray-500 mb-1">2024级</p>
        <p className="text-2xl font-bold text-green-600">{grade2024}</p>
      </div>
      <div className="card p-4">
        <p className="text-sm text-gray-500 mb-1">2023级</p>
        <p className="text-2xl font-bold text-orange-600">{grade2023}</p>
      </div>
      <div className="card p-4">
        <p className="text-sm text-gray-500 mb-1">2022级</p>
        <p className="text-2xl font-bold text-purple-600">{grade2022}</p>
      </div>
    </div>
  )
}