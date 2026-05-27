import { Student, StudentFormData } from '../../shared/types'
import { Modal, ConfirmModal } from '../../shared/components'

// 学生状态选项
const STATUS_OPTIONS = [
  { value: '在读', label: '在读' },
  { value: '休学', label: '休学' },
  { value: '毕业', label: '毕业' },
  { value: '退学', label: '退学' },
]

// 性别选项
const GENDER_OPTIONS = [
  { value: '男', label: '男' },
  { value: '女', label: '女' },
]

interface StudentModalsProps {
  // 新增模态框
  addModalOpen: boolean
  formData: StudentFormData
  saving: boolean
  onAddClose: () => void
  onAddConfirm: () => void
  onFormChange: (data: Partial<StudentFormData>) => void

  // 编辑模态框
  editModalOpen: boolean
  selectedStudent: Student | null
  onEditClose: () => void
  onEditConfirm: () => void

  // 删除模态框
  deleteModalOpen: boolean
  onDeleteClose: () => void
  onDeleteConfirm: () => void
}

export function StudentModals({
  addModalOpen,
  formData,
  saving,
  onAddClose,
  onAddConfirm,
  onFormChange,
  editModalOpen,
  selectedStudent,
  onEditClose,
  onEditConfirm,
  deleteModalOpen,
  onDeleteClose,
  onDeleteConfirm,
}: StudentModalsProps) {
  return (
    <>
      {/* 新增学生模态框 */}
      <Modal isOpen={addModalOpen} onClose={onAddClose} title="新增学生" size="lg">
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">学号 <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="form-input"
                placeholder="请输入学号"
                value={formData.code}
                onChange={(e) => onFormChange({ code: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">姓名 <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="form-input"
                placeholder="请输入姓名"
                value={formData.name}
                onChange={(e) => onFormChange({ name: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">性别 <span className="text-red-500">*</span></label>
              <select
                className="form-select"
                value={formData.gender}
                onChange={(e) => onFormChange({ gender: e.target.value })}
              >
                {GENDER_OPTIONS.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">入学年份 <span className="text-red-500">*</span></label>
              <select
                className="form-select"
                value={formData.enrollYear}
                onChange={(e) => onFormChange({ enrollYear: Number(e.target.value) })}
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div>
              <label className="form-label">手机号</label>
              <input
                type="tel"
                className="form-input"
                placeholder="请输入手机号"
                value={formData.phone || ''}
                onChange={(e) => onFormChange({ phone: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">邮箱</label>
              <input
                type="email"
                className="form-input"
                placeholder="请输入邮箱"
                value={formData.email || ''}
                onChange={(e) => onFormChange({ email: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="form-label">学籍状态</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => onFormChange({ status: e.target.value })}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onAddClose}
              className="btn btn-secondary"
            >
              取消
            </button>
            <button
              type="button"
              onClick={onAddConfirm}
              disabled={saving}
              className="btn btn-primary disabled:opacity-50"
            >
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </Modal>

      {/* 编辑学生模态框 */}
      <Modal isOpen={editModalOpen} onClose={onEditClose} title="编辑学生信息" size="lg">
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">学号</label>
              <input
                type="text"
                className="form-input bg-gray-50"
                value={formData.code}
                readOnly
              />
            </div>
            <div>
              <label className="form-label">姓名 <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => onFormChange({ name: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">性别</label>
              <select
                className="form-select"
                value={formData.gender}
                onChange={(e) => onFormChange({ gender: e.target.value })}
              >
                {GENDER_OPTIONS.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">手机号</label>
              <input
                type="tel"
                className="form-input"
                value={formData.phone || ''}
                onChange={(e) => onFormChange({ phone: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">邮箱</label>
              <input
                type="email"
                className="form-input"
                value={formData.email || ''}
                onChange={(e) => onFormChange({ email: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">学籍状态</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => onFormChange({ status: e.target.value })}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onEditClose}
              className="btn btn-secondary"
            >
              取消
            </button>
            <button
              type="button"
              onClick={onEditConfirm}
              disabled={saving}
              className="btn btn-primary disabled:opacity-50"
            >
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </Modal>

      {/* 删除确认模态框 */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={onDeleteClose}
        onConfirm={onDeleteConfirm}
        title="确认删除"
        message={`确定要删除学生"${selectedStudent?.name}"的信息吗？`}
        warning="此操作无法恢复。"
      />
    </>
  )
}