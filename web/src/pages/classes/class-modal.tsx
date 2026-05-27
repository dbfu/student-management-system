import { Class, ClassFormData, College, Major, Student } from '../../shared/types'
import { Modal, ConfirmModal } from '../../shared/components'

// 年级选项
const GRADE_OPTIONS = [
  { value: 2024, label: '2024级' },
  { value: 2023, label: '2023级' },
  { value: 2022, label: '2022级' },
  { value: 2021, label: '2021级' },
]

interface ClassModalsProps {
  colleges: College[]
  formData: ClassFormData
  saving: boolean
  selectedClass: Class | null
  classStudents: Student[]
  addModalOpen: boolean
  editModalOpen: boolean
  deleteModalOpen: boolean
  studentsModalOpen: boolean
  filteredMajors: Major[]
  onAddClose: () => void
  onAddConfirm: () => void
  onFormChange: (data: Partial<ClassFormData>) => void
  onEditClose: () => void
  onEditConfirm: () => void
  onDeleteClose: () => void
  onDeleteConfirm: () => void
  onStudentsClose: () => void
}

export function ClassModals({
  colleges,
  formData,
  saving,
  selectedClass,
  classStudents,
  addModalOpen,
  editModalOpen,
  deleteModalOpen,
  studentsModalOpen,
  filteredMajors,
  onAddClose,
  onAddConfirm,
  onFormChange,
  onEditClose,
  onEditConfirm,
  onDeleteClose,
  onDeleteConfirm,
  onStudentsClose,
}: ClassModalsProps) {
  return (
    <>
      {/* 新增班级模态框 */}
      <Modal isOpen={addModalOpen} onClose={onAddClose} title="新增班级">
        <form className="space-y-4">
          <div>
            <label className="form-label">班级编号 <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="form-input"
              placeholder="请输入班级编号"
              value={formData.code}
              onChange={(e) => onFormChange({ code: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">班级名称 <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="form-input"
              placeholder="请输入班级名称"
              value={formData.name}
              onChange={(e) => onFormChange({ name: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">所属学院 <span className="text-red-500">*</span></label>
            <select
              className="form-select"
              value={formData.collegeId}
              onChange={(e) => onFormChange({ collegeId: Number(e.target.value), majorId: 0 })}
            >
              <option value="">请选择</option>
              {colleges.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">所属专业 <span className="text-red-500">*</span></label>
            <select
              className="form-select"
              value={formData.majorId}
              onChange={(e) => onFormChange({ majorId: Number(e.target.value) })}
            >
              <option value="">请选择</option>
              {filteredMajors.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">年级 <span className="text-red-500">*</span></label>
            <select
              className="form-select"
              value={formData.grade}
              onChange={(e) => onFormChange({ grade: Number(e.target.value) })}
            >
              {GRADE_OPTIONS.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onAddClose} className="btn btn-secondary">取消</button>
            <button type="button" onClick={onAddConfirm} disabled={saving} className="btn btn-primary disabled:opacity-50">
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </Modal>

      {/* 编辑班级模态框 */}
      <Modal isOpen={editModalOpen} onClose={onEditClose} title="编辑班级信息">
        <form className="space-y-4">
          <div>
            <label className="form-label">班级编号</label>
            <input type="text" className="form-input bg-gray-50" value={formData.code} readOnly />
          </div>
          <div>
            <label className="form-label">班级名称 <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => onFormChange({ name: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">所属学院</label>
            <select
              className="form-select"
              value={formData.collegeId}
              onChange={(e) => onFormChange({ collegeId: Number(e.target.value) })}
            >
              {colleges.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">所属专业</label>
            <select
              className="form-select"
              value={formData.majorId}
              onChange={(e) => onFormChange({ majorId: Number(e.target.value) })}
            >
              {filteredMajors.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">年级</label>
            <select
              className="form-select"
              value={formData.grade}
              onChange={(e) => onFormChange({ grade: Number(e.target.value) })}
            >
              {GRADE_OPTIONS.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onEditClose} className="btn btn-secondary">取消</button>
            <button type="button" onClick={onEditConfirm} disabled={saving} className="btn btn-primary disabled:opacity-50">
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </Modal>

      {/* 查看学生模态框 */}
      <Modal isOpen={studentsModalOpen} onClose={onStudentsClose} title="班级学生列表" size="xl">
        <div>
          <p className="text-sm text-gray-500 mb-4">
            {selectedClass?.name} ({selectedClass?.code})
          </p>
          {/* 学生统计 */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-primary/5 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-primary">{classStudents.length}</p>
              <p className="text-sm text-gray-500">总人数</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{classStudents.filter(s => s.status === '在读').length}</p>
              <p className="text-sm text-gray-500">在读</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">{classStudents.filter(s => s.status === '休学').length}</p>
              <p className="text-sm text-gray-500">休学</p>
            </div>
          </div>
          {/* 学生列表 */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {classStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className={`w-10 h-10 ${
                  student.gender === '男' ? 'bg-primary/10' : 'bg-green-100'
                } rounded-full flex items-center justify-center mr-4`}>
                  <span className={`text-sm font-medium ${
                    student.gender === '男' ? 'text-primary' : 'text-green-600'
                  }`}>
                    {student.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{student.name}</p>
                  <p className="text-xs text-gray-500">学号: {student.code}</p>
                </div>
                <span className={`px-2 py-1 ${
                  student.status === '在读' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                } text-xs rounded-full`}>
                  {student.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button onClick={onStudentsClose} className="btn btn-primary">关闭</button>
        </div>
      </Modal>

      {/* 删除确认模态框 */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={onDeleteClose}
        onConfirm={onDeleteConfirm}
        title="确认删除"
        message={`确定要删除班级"${selectedClass?.name}"吗？`}
        warning={selectedClass?.studentCount ? `该班级下有 ${selectedClass.studentCount} 名学生，删除后学生将失去班级归属。` : undefined}
      />
    </>
  )
}