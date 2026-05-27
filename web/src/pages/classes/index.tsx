import { useState, useEffect, useCallback } from 'react'
import { getClasses, createClass, updateClass, deleteClass, getClassStudents } from '../../shared/services/class-service'
import { getColleges, getMajors } from '../../shared/services/common-service'
import { Class, College, Major, ClassFormData, ClassQueryParams, Student } from '../../shared/types'
import { ClassFilters } from './class-filters'
import { ClassStats } from './class-stats'
import { ClassTable } from './class-table'
import { ClassModals } from './class-modal'

export default function ClassListPage() {
  // 数据状态
  const [classes, setClasses] = useState<Class[]>([])
  const [colleges, setColleges] = useState<College[]>([])
  const [majors, setMajors] = useState<Major[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  // 查询参数
  const [params, setParams] = useState<ClassQueryParams>({
    page: 1,
    pageSize: 10,
    keyword: '',
    collegeId: undefined,
    majorId: undefined,
    grade: undefined,
  })

  // 模态框状态
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [studentsModalOpen, setStudentsModalOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [classStudents, setClassStudents] = useState<Student[]>([])
  const [formData, setFormData] = useState<ClassFormData>({
    code: '',
    name: '',
    collegeId: 0,
    majorId: 0,
    grade: 2024,
    teacherId: undefined,
  })
  const [saving, setSaving] = useState(false)

  // 加载班级数据
  const loadClasses = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getClasses(params)
      setClasses(result.list)
      setTotal(result.total)
    } catch {
      // 使用mock数据
      setClasses([
        { id: 1, code: 'C001', name: '软件工程2024级1班', collegeId: 1, collegeName: '计算机学院', majorId: 1, majorName: '软件工程', grade: 2024, teacherName: '李教授', studentCount: 32 },
        { id: 2, code: 'C002', name: '软件工程2024级2班', collegeId: 1, collegeName: '计算机学院', majorId: 1, majorName: '软件工程', grade: 2024, teacherName: '王副教授', studentCount: 30 },
        { id: 3, code: 'C003', name: '人工智能2024级1班', collegeId: 2, collegeName: '人工智能学院', majorId: 3, majorName: '人工智能', grade: 2024, teacherName: '张讲师', studentCount: 28 },
        { id: 4, code: 'C004', name: '数据科学2023级1班', collegeId: 3, collegeName: '数据科学学院', majorId: 4, majorName: '数据科学', grade: 2023, teacherName: '赵助教', studentCount: 25 },
        { id: 5, code: 'C005', name: '网络安全2022级1班', collegeId: 4, collegeName: '网络安全学院', majorId: 5, majorName: '网络安全', grade: 2022, teacherName: '孙教授', studentCount: 22 },
      ])
      setTotal(42)
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

  // 加载专业数据
  useEffect(() => {
    const loadMajors = async () => {
      try {
        const result = await getMajors()
        setMajors(result)
      } catch {
        setMajors([
          { id: 1, name: '软件工程', collegeId: 1 },
          { id: 2, name: '计算机科学', collegeId: 1 },
          { id: 3, name: '人工智能', collegeId: 2 },
          { id: 4, name: '数据科学', collegeId: 3 },
          { id: 5, name: '网络安全', collegeId: 4 },
        ])
      }
    }
    loadMajors()
  }, [])

  // 加载班级数据
  useEffect(() => {
    loadClasses()
  }, [loadClasses])

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

  // 查看班级学生
  const handleViewStudents = async (classItem: Class) => {
    setSelectedClass(classItem)
    try {
      const students = await getClassStudents(classItem.id)
      setClassStudents(students)
    } catch {
      // mock数据
      setClassStudents([
        { id: 1, code: '2024001', name: '张三', gender: '男', status: '在读' },
        { id: 2, code: '2024002', name: '李明', gender: '男', status: '在读' },
        { id: 3, code: '2024003', name: '王伟', gender: '男', status: '休学' },
        { id: 4, code: '2024004', name: '赵芳', gender: '女', status: '在读' },
        { id: 5, code: '2024005', name: '钱强', gender: '男', status: '在读' },
      ])
    }
    setStudentsModalOpen(true)
  }

  // 新增班级
  const handleAdd = async () => {
    setSaving(true)
    try {
      await createClass(formData)
      setAddModalOpen(false)
      loadClasses()
      resetForm()
    } catch (err) {
      console.error('新增班级失败:', err)
    } finally {
      setSaving(false)
    }
  }

  // 编辑班级
  const handleEdit = async () => {
    if (!selectedClass) return
    setSaving(true)
    try {
      await updateClass(selectedClass.id, formData)
      setEditModalOpen(false)
      loadClasses()
      resetForm()
    } catch (err) {
      console.error('编辑班级失败:', err)
    } finally {
      setSaving(false)
    }
  }

  // 删除班级
  const handleDelete = async () => {
    if (!selectedClass) return
    try {
      await deleteClass(selectedClass.id)
      setDeleteModalOpen(false)
      loadClasses()
    } catch (err) {
      console.error('删除班级失败:', err)
    }
  }

  // 重置表单
  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      collegeId: 0,
      majorId: 0,
      grade: 2024,
      teacherId: undefined,
    })
    setSelectedClass(null)
  }

  // 打开编辑模态框
  const openEditModal = (classItem: Class) => {
    setSelectedClass(classItem)
    setFormData({
      code: classItem.code,
      name: classItem.name,
      collegeId: classItem.collegeId,
      majorId: classItem.majorId,
      grade: classItem.grade,
      teacherId: classItem.teacherId,
    })
    setEditModalOpen(true)
  }

  // 打开删除模态框
  const openDeleteModal = (classItem: Class) => {
    setSelectedClass(classItem)
    setDeleteModalOpen(true)
  }

  // 表单数据变更
  const handleFormChange = (data: Partial<ClassFormData>) => {
    setFormData({ ...formData, ...data })
  }

  // 统计数据
  const stats = {
    total: total,
    grade2024: classes.filter(c => c.grade === 2024).length,
    grade2023: classes.filter(c => c.grade === 2023).length,
    grade2022: classes.filter(c => c.grade === 2022).length,
  }

  // 根据学院筛选专业
  const filteredMajors = formData.collegeId
    ? majors.filter(m => m.collegeId === formData.collegeId)
    : majors

  return (
    <div className="space-y-6">
      {/* 篮选区域 */}
      <ClassFilters
        params={params}
        colleges={colleges}
        majors={majors}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onAddClick={() => setAddModalOpen(true)}
      />

      {/* 统计卡片 */}
      <ClassStats
        total={stats.total}
        grade2024={stats.grade2024}
        grade2023={stats.grade2023}
        grade2022={stats.grade2022}
      />

      {/* 班级表格 */}
      <ClassTable
        classes={classes}
        loading={loading}
        page={params.page || 1}
        pageSize={params.pageSize || 10}
        total={total}
        onPageChange={handlePageChange}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
        onViewStudents={handleViewStudents}
      />

      {/* 模态框组件 */}
      <ClassModals
        colleges={colleges}
        formData={formData}
        saving={saving}
        selectedClass={selectedClass}
        classStudents={classStudents}
        addModalOpen={addModalOpen}
        editModalOpen={editModalOpen}
        deleteModalOpen={deleteModalOpen}
        studentsModalOpen={studentsModalOpen}
        filteredMajors={filteredMajors}
        onAddClose={() => { setAddModalOpen(false); resetForm() }}
        onAddConfirm={handleAdd}
        onFormChange={handleFormChange}
        onEditClose={() => { setEditModalOpen(false); resetForm() }}
        onEditConfirm={handleEdit}
        onDeleteClose={() => { setDeleteModalOpen(false); resetForm() }}
        onDeleteConfirm={handleDelete}
        onStudentsClose={() => setStudentsModalOpen(false)}
      />
    </div>
  )
}