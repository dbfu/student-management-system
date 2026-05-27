import { Teacher, TeacherFormData, College } from '../../shared/types'
import { Modal, ConfirmModal } from '../../shared/components'

// 职称选项
const TITLE_OPTIONS = [
  { value: '教授', label: '教授' },
  { value: '副教授', label: '副教授' },
  { value: '讲师', label: '讲师' },
  { value: '助教', label: '助教' },
]

// 状态选项
const STATUS_OPTIONS = [
  { value: '在职', label: '在职' },
  { value: '离职', label: '离职' },
]

// 性别选项
const GENDER_OPTIONS = [
  { value: '男', label: '男' },
  { value: '女', label: '女' },
]

interface TeacherModalsProps {
  colleges: College[]
  addModalOpen: boolean
  formData: TeacherFormData
  saving: boolean
  selectedTeacher: Teacher | null
  editModalOpen: boolean
  deleteModalOpen: boolean
  onAddClose: () => void
  onAddConfirm: () => void
  onFormChange: (data: Partial<TeacherFormData>) => void
  onEditClose: () => void
  onEditConfirm: () => void
  onDeleteClose: () => void
  onDeleteConfirm: () => void
}

export function TeacherModals({
  colleges,
  addModalOpen,
  formData,
  saving,
  selectedTeacher,
  editModalOpen,
  deleteModalOpen,
  onAddClose,
  onAddConfirm,
  onFormChange,
  onEditClose,
  onEditConfirm,
  onDeleteClose,
  onDeleteConfirm,
}: TeacherModalsProps) {
  return (
    <>
      {/* 新增教师模态框 */}
      <Modal isOpen={addModalOpen} onClose={onAddClose} title="新增教师" size="lg">
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">教师工号 <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="form-input"
                placeholder="请输入工号"
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
            <div>
              <label className="form-label">所属学院 <span className="text-red-500">*</span></label>
              <select
                className="form-select"
                value={formData.collegeId}
                onChange={(e) => onFormChange({ collegeId: Number(e.target.value) })}
              >
                <option value="">请选择</option>
                {colleges.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">职称 <span className="text-red-500">*</span></label>
              <select
                className="form-select"
                value={formData.title}
                onChange={(e) => onFormChange({ title: e.target.value })}
              >
                {TITLE_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">状态</label>
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
            <button type="button" onClick={onAddClose} className="btn btn-secondary">取消</button>
            <button type="button" onClick={onAddConfirm} disabled={saving} className="btn btn-primary disabled:opacity-50">
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </Modal>

      {/* 编辑教师模态框 */}
      <Modal isOpen={editModalOpen} onClose={onEditClose} title="编辑教师信息" size="lg">
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">教师工号</label>
              <input type="text" className="form-input bg-gray-50" value={formData.code} readOnly />
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
              <label className="form-label">职称</label>
              <select
                className="form-select"
                value={formData.title}
                onChange={(e) => onFormChange({ title: e.target.value })}
              >
                {TITLE_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">状态</label>
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
            <button type="button" onClick={onEditClose} className="btn btn-secondary">取消</button>
            <button type="button" onClick={onEditConfirm} disabled={saving} className="btn btn-primary disabled:opacity-50">
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
        message={`确定要删除教师"${selectedTeacher?.name}"的信息吗？`}
        warning="此操作无法恢复。"
      />
    </>
  )
}