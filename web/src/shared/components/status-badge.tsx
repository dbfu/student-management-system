interface StatusBadgeProps {
  status: string
  type?: 'student' | 'teacher' | 'class' | 'title'
}

const statusConfig = {
  student: {
    '在读': { bg: 'bg-green-100', text: 'text-green-600' },
    '休学': { bg: 'bg-orange-100', text: 'text-orange-600' },
    '毕业': { bg: 'bg-gray-100', text: 'text-gray-600' },
    '退学': { bg: 'bg-red-100', text: 'text-red-600' },
  },
  teacher: {
    '在职': { bg: 'bg-green-100', text: 'text-green-600' },
    '离职': { bg: 'bg-gray-100', text: 'text-gray-600' },
  },
  title: {
    '教授': { bg: 'bg-purple-100', text: 'text-purple-600' },
    '副教授': { bg: 'bg-orange-100', text: 'text-orange-600' },
    '讲师': { bg: 'bg-blue-100', text: 'text-blue-600' },
    '助教': { bg: 'bg-gray-100', text: 'text-gray-600' },
  },
  class: {},
}

export default function StatusBadge({ status, type = 'student' }: StatusBadgeProps) {
  const config = statusConfig[type as keyof typeof statusConfig]
  const style = (config as Record<string, { bg: string; text: string }>)[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
  }

  return (
    <span className={`px-2 py-1 ${style.bg} ${style.text} text-xs rounded-full`}>
      {status}
    </span>
  )
}