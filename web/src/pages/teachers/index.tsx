import { useState, useEffect, useCallback } from 'react'
import { getTeachers, createTeacher, updateTeacher, deleteTeacher } from '../../shared/services/teacher-service'
import { getColleges } from '../../shared/services/common-service'
import { Teacher, College, TeacherFormData, TeacherQueryParams } from '../../shared/types'
import { TeacherFilters } from './teacher-filters'
import { TeacherStats } from './teacher-stats'
import { TeacherTable } from './teacher-table'
import { TeacherModals } from './teacher-modal'

export default function TeacherListPage() {
  // 数据状态
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  // 查询参数
  const [params, setParams] = useState<TeacherQueryParams>({
    page: 1,
    pageSize: 10,
    keyword: '',
    collegeId: undefined,
    title: undefined,
    status: undefined,
  })

  // 模态框状态
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [formData, setFormData] = useState<TeacherFormData>({
    code: '',
    name: '',
    gender: '男',
    collegeId: 0,
    title: '讲师',
    status: '在职',
  })
  const [saving, setSaving] = useState(false)

  // 加载教师数据
  const loadTeachers = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getTeachers(params)
      setTeachers(result.list)
      setTotal(result.total)
    } catch {
      // 使用mock数据
      setTeachers([
        { id: 1, code: 'T001', name: '李教授', gender: '男', collegeName: '计算机学院', title: '教授', status: '在职' },
        { id: 2, code: 'T002', name: '王副教授', gender: '女', collegeName: '人工智能学院', title: '副教授', status: '在职' },
        { id: 3, code: 'T003', name: '张讲师', gender: '男', collegeName: '数据科学学院', title: '讲师', status: '在职' },
        { id: 4, code: 'T004', name: '赵助教', gender: '女', collegeName: '网络安全学院', title: '助教', status: '在职' },
        { id: 5, code: 'T005', name: '孙教授', gender: '男', collegeName: '软件学院', title: '教授', status: '离职' },
      ])
      setTotal(86)
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

  // 加载教师数据
  useEffect(() => {
    loadTeachers()
  }, [loadTeachers])

  // 搜索处理
  const handleSearch = (keyword: string) => {
    setParams({ ...params, keyword, page: 1 })
  }

  // 篮选处理
  const handleFilter = (key: string, value: string | number | undefined) => {
    setParams({ ...params, [key]: value, page: 1 })
  }

  // 分页处理
  const handlePageChange = (page: number) => {
    setParams({ ...params, page })
  }

  // 新增教师
  const handleAdd = async () => {
    setSaving(true)
    try {
      await createTeacher(formData)
      setAddModalOpen(false)
      loadTeachers()
      resetForm()
    } catch (err) {
      console.error('新增教师失败:', err)
    } finally {
      setSaving(false)
    }
  }

  // 编辑教师
  const handleEdit = async () => {
    if (!selectedTeacher) return
    setSaving(true)
    try {
      await updateTeacher(selectedTeacher.id, formData)
      setEditModalOpen(false)
      loadTeachers()
      resetForm()
    } catch (err) {
      console.error('编辑教师失败:', err)
    } finally {
      setSaving(false)
    }
  }

  // 删除教师
  const handleDelete = async () => {
    if (!selectedTeacher) return
    try {
      await deleteTeacher(selectedTeacher.id)
      setDeleteModalOpen(false)
      loadTeachers()
    } catch (err) {
      console.error('删除教师失败:', err)
    }
  }

  // 重置表单
  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      gender: '男',
      collegeId: 0,
      title: '讲师',
      status: '在职',
    })
    setSelectedTeacher(null)
  }

  // 打开编辑模态框
  const openEditModal = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setFormData({
      code: teacher.code,
      name: teacher.name,
      gender: teacher.gender,
      collegeId: teacher.collegeId || 0,
      title: teacher.title,
      status: teacher.status,
      phone: teacher.phone,
      email: teacher.email,
    })
    setEditModalOpen(true)
  }

  // 打开删除模态框
  const openDeleteModal = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setDeleteModalOpen(true)
  }

  // 表单数据变更
  const handleFormChange = (data: Partial<TeacherFormData>) => {
    setFormData({ ...formData, ...data })
  }

  // 统计数据
  const stats = {
    total: total,
    active: teachers.filter(t => t.status === '在职').length,
    professor: teachers.filter(t => t.title === '教授').length,
    associate: teachers.filter(t => t.title === '副教授').length,
  }

  return (
    <div className="space-y-6">
      {/* 篮选区域 */}
      <TeacherFilters
        params={params}
        colleges={colleges}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onAddClick={() => setAddModalOpen(true)}
      />

      {/* 统计卡片 */}
      <TeacherStats
        total={stats.total}
        active={stats.active}
        professor={stats.professor}
        associate={stats.associate}
      />

      {/* 教师表格 */}
      <TeacherTable
        teachers={teachers}
        loading={loading}
        page={params.page || 1}
        pageSize={params.pageSize || 10}
        total={total}
        onPageChange={handlePageChange}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      {/* 模态框组件 */}
      <TeacherModals
        colleges={colleges}
        addModalOpen={addModalOpen}
        formData={formData}
        saving={saving}
        selectedTeacher={selectedTeacher}
        editModalOpen={editModalOpen}
        deleteModalOpen={deleteModalOpen}
        onAddClose={() => { setAddModalOpen(false); resetForm() }}
        onAddConfirm={handleAdd}
        onFormChange={handleFormChange}
        onEditClose={() => { setEditModalOpen(false); resetForm() }}
        onEditConfirm={handleEdit}
        onDeleteClose={() => { setDeleteModalOpen(false); resetForm() }}
        onDeleteConfirm={handleDelete}
      />
    </div>
  )
}