import { useState, useEffect, useCallback } from 'react'
import { getStudents, createStudent, updateStudent, deleteStudent } from '../../shared/services/student-service'
import { getColleges } from '../../shared/services/common-service'
import { Student, College, StudentFormData, StudentQueryParams } from '../../shared/types'
import { StudentFilters } from './student-filters'
import { StudentStats } from './student-stats'
import { StudentTable } from './student-table'
import { StudentModals } from './student-modal'
import { useToast } from '../../shared/components'
import { useDebounce } from '../../shared/hooks/use-debounce'

export default function StudentListPage() {
  const { showToast } = useToast()

  // 数据状态
  const [students, setStudents] = useState<Student[]>([])
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  // 查询参数 - 用于搜索输入显示
  const [searchInput, setSearchInput] = useState('')
  // 实际发送到API的参数（使用防抖）
  const debouncedSearch = useDebounce(searchInput, 300)

  // 查询参数
  const [params, setParams] = useState<StudentQueryParams>({
    page: 1,
    pageSize: 10,
    keyword: '',
    collegeId: undefined,
    classId: undefined,
    status: undefined,
  })

  // 模态框状态
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [formData, setFormData] = useState<StudentFormData>({
    code: '',
    name: '',
    gender: '男',
    classId: 0,
    enrollYear: 2024,
    status: '在读',
  })
  const [saving, setSaving] = useState(false)

  // 防抖搜索：当debouncedSearch变化时更新params
  useEffect(() => {
    setParams((prev) => ({ ...prev, keyword: debouncedSearch, page: 1 }))
  }, [debouncedSearch])

  // 加载学生数据
  const loadStudents = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getStudents(params)
      setStudents(result.list)
      setTotal(result.total)
    } catch {
      // 使用mock数据
      setStudents([
        { id: 1, code: '2024001', name: '张三', gender: '男', className: '软件2024级1班', status: '在读' },
        { id: 2, code: '2024002', name: '李四', gender: '女', className: 'AI2024级1班', status: '在读' },
        { id: 3, code: '2024003', name: '王五', gender: '男', className: 'DS2024级1班', status: '休学' },
        { id: 4, code: '2024004', name: '赵六', gender: '女', className: 'Sec2024级1班', status: '在读' },
        { id: 5, code: '2024005', name: '钱七', gender: '男', className: '软件2024级2班', status: '毕业' },
      ])
      setTotal(1285)
    } finally {
      setLoading(false)
    }
  }, [params])

  // 加载学院数据
  useEffect(() => {
    const loadColleges = async () => {
      try {
        const result = await getColleges()
        setColleges(result)
      } catch {
        setColleges([
          { id: 1, name: '计算机学院' },
          { id: 2, name: '人工智能学院' },
          { id: 3, name: '数据科学学院' },
          { id: 4, name: '网络安全学院' },
          { id: 5, name: '软件学院' },
        ])
      }
    }
    loadColleges()
  }, [])

  // 加载学生数据
  useEffect(() => {
    loadStudents()
  }, [loadStudents])

  // 搜索处理 - 更新searchInput，通过debounce间接更新params
  const handleSearch = (keyword: string) => {
    setSearchInput(keyword)
  }

  // 筛选处理
  const handleFilter = (key: string, value: string | number | undefined) => {
    setParams({ ...params, [key]: value, page: 1 })
  }

  // 分页处理
  const handlePageChange = (page: number) => {
    setParams({ ...params, page })
  }

  // 新增学生
  const handleAdd = async () => {
    // 表单验证
    if (!formData.code.trim()) {
      showToast('请输入学号', 'error')
      return
    }
    if (!formData.name.trim()) {
      showToast('请输入姓名', 'error')
      return
    }

    setSaving(true)
    try {
      await createStudent(formData)
      showToast('学生添加成功', 'success')
      setAddModalOpen(false)
      loadStudents()
      resetForm()
    } catch (err) {
      console.error('新增学生失败:', err)
      showToast('新增学生失败，请稍后重试', 'error')
    } finally {
      setSaving(false)
    }
  }

  // 编辑学生
  const handleEdit = async () => {
    if (!selectedStudent) return
    setSaving(true)
    try {
      await updateStudent(selectedStudent.id, formData)
      setEditModalOpen(false)
      loadStudents()
      resetForm()
    } catch (err) {
      console.error('编辑学生失败:', err)
    } finally {
      setSaving(false)
    }
  }

  // 删除学生
  const handleDelete = async () => {
    if (!selectedStudent) return
    try {
      await deleteStudent(selectedStudent.id)
      setDeleteModalOpen(false)
      loadStudents()
    } catch (err) {
      console.error('删除学生失败:', err)
    }
  }

  // 重置表单
  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      gender: '男',
      classId: 0,
      enrollYear: 2024,
      status: '在读',
    })
    setSelectedStudent(null)
  }

  // 打开编辑模态框
  const openEditModal = (student: Student) => {
    setSelectedStudent(student)
    setFormData({
      code: student.code,
      name: student.name,
      gender: student.gender,
      classId: student.classId || 0,
      enrollYear: student.enrollYear || 2024,
      status: student.status,
      phone: student.phone,
      email: student.email,
    })
    setEditModalOpen(true)
  }

  // 打开删除模态框
  const openDeleteModal = (student: Student) => {
    setSelectedStudent(student)
    setDeleteModalOpen(true)
  }

  // 表单数据变更
  const handleFormChange = (data: Partial<StudentFormData>) => {
    setFormData({ ...formData, ...data })
  }

  // 统计数据
  const stats = {
    total: total,
    studying: students.filter(s => s.status === '在读').length,
    suspended: students.filter(s => s.status === '休学').length,
    graduated: students.filter(s => s.status === '毕业').length,
  }

  return (
    <div className="space-y-6">
      {/* 筛选区域 */}
      <StudentFilters
        params={params}
        colleges={colleges}
        searchInput={searchInput}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onAddClick={() => setAddModalOpen(true)}
      />

      {/* 统计卡片 */}
      <StudentStats
        total={stats.total}
        studying={stats.studying}
        suspended={stats.suspended}
        graduated={stats.graduated}
      />

      {/* 学生表格 */}
      <StudentTable
        students={students}
        loading={loading}
        page={params.page || 1}
        pageSize={params.pageSize || 10}
        total={total}
        onPageChange={handlePageChange}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      {/* 模态框组件 */}
      <StudentModals
        addModalOpen={addModalOpen}
        formData={formData}
        saving={saving}
        onAddClose={() => { setAddModalOpen(false); resetForm() }}
        onAddConfirm={handleAdd}
        onFormChange={handleFormChange}
        editModalOpen={editModalOpen}
        selectedStudent={selectedStudent}
        onEditClose={() => { setEditModalOpen(false); resetForm() }}
        onEditConfirm={handleEdit}
        deleteModalOpen={deleteModalOpen}
        onDeleteClose={() => { setDeleteModalOpen(false); resetForm() }}
        onDeleteConfirm={handleDelete}
      />
    </div>
  )
}