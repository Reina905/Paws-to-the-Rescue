import { useEffect, useRef } from "react"
import { AlertTriangle } from "lucide-react"

/**
 * Accessible confirmation dialog for deleting an opportunity.
 * Traps focus within the modal and returns focus on close.
 *
 * @param {{ isOpen: boolean, opportunityName: string, onConfirm: () => void, onCancel: () => void }} props
 */
export const DeleteConfirmModal = ({ isOpen, opportunityName, onConfirm, onCancel }) => {
  const cancelRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement
      // Small delay to allow the modal to render before focusing
      const timer = setTimeout(() => {
        cancelRef.current?.focus()
      }, 0)
      return () => clearTimeout(timer)
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus()
      previousFocusRef.current = null
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onCancel()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-hidden={!isOpen}
    >
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-confirm-title"
        aria-describedby="delete-confirm-description"
        className="relative z-10 bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle size={24} className="text-red-600" />
          </div>

          <h2
            id="delete-confirm-title"
            className="text-lg font-semibold text-primary"
          >
            Delete Opportunity
          </h2>

          <p
            id="delete-confirm-description"
            className="text-secondary-dark text-sm mt-2"
          >
            Are you sure you want to delete{" "}
            <span className="font-medium text-primary">{opportunityName}</span>?
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-xl border border-secondary text-secondary-dark font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
