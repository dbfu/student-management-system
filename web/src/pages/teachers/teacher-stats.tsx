interface TeacherStatsProps {
  total: number
  active: number
  professor: number
  associate: number
}

export function TeacherStats({ total, active, professor, associate }: TeacherStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="card p-4">
        <p className="text-sm text-gray-500 mb-1">总教师数</p>
        <p className="text-2xl font-bold text-primary">{total}</p>
      </div>
      <div className="card p-4">
        <p className="text-sm text-gray-500 mb-1">在职教师</p>
        <p className="text-2xl font-bold text-green-600">{active}</p>
      </div>
      <div className="card p-4">
        <p className="text-sm text-gray-500 mb-1">教授</p>
        <p className="text-2xl font-bold text-purple-600">{professor}</p>
      </div>
      <div className="card p-4">
        <p className="text-sm text-gray-500 mb-1">副教授</p>
        <p className="text-2xl font-bold text-orange-600">{associate}</p>
      </div>
    </div>
  )
}