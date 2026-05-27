interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  warning?: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  warning,
  confirmText = '确认',
  cancelText = '取消',
  danger = true,
}: ConfirmModalProps) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      {/* Content */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center">
          <div
            className={`w-16 h-16 ${danger ? 'bg-red-100' : 'bg-primary/10'} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            <svg
              className={`w-8 h-8 ${danger ? 'text-red-500' : 'text-primary'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-500 mb-2">{message}</p>
          {warning && <p className="text-sm text-orange-600 mb-6">{warning}</p>}
          <div className="flex justify-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className={`px-6 py-2.5 ${
                danger ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary-dark'
              } text-white rounded-lg transition-colors`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}