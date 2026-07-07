import { useState, useEffect, useCallback } from "react"
import { ShelterDashboardSidebar } from "../features/shelterDashboard/ShelterDashboardSidebar"
import { OpportunityCardList } from "../features/shelterDashboard/OpportunityCardList"
import { OpportunityFormModal } from "../features/shelterDashboard/OpportunityFormModal"
import { DeleteConfirmModal } from "../features/shelterDashboard/DeleteConfirmModal"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { ErrorMessage } from "../components/ErrorMessage"
import { useShelterDashboard } from "../hooks/useShelters"
import { useAuthStore } from "../store/authStore"
import {
  getShelterOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  getOpportunityApplicants,
} from "../services/opportunitiesService"

export const ShelterOpportunityManagement = () => {
  const { data: dashboardData } = useShelterDashboard()
  const user = useAuthStore((state) => state.user)

  const shelterName = dashboardData?.name || user?.user_metadata?.name || "My Shelter"

  // Opportunities state
  const [opportunities, setOpportunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Expanded card state
  const [expandedId, setExpandedId] = useState(null)
  const [enrolledVolunteers, setEnrolledVolunteers] = useState([])
  const [enrolledLoading, setEnrolledLoading] = useState(false)

  // Form modal state
  const [showFormModal, setShowFormModal] = useState(false)
  const [editingOpportunity, setEditingOpportunity] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletingOpportunity, setDeletingOpportunity] = useState(null)

  // Fetch opportunities on mount
  const fetchOpportunities = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Use user.id as the shelterId — the backend resolves via shelter_id column
      const data = await getShelterOpportunities(user?.id)
      setOpportunities(data || [])
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load opportunities")
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    if (user?.id) {
      fetchOpportunities()
    }
  }, [user?.id, fetchOpportunities])

  // Fetch enrolled volunteers when a card is expanded
  const handleExpand = useCallback(async (opportunityId) => {
    if (expandedId === opportunityId) {
      setExpandedId(null)
      setEnrolledVolunteers([])
      return
    }

    setExpandedId(opportunityId)
    setEnrolledLoading(true)
    setEnrolledVolunteers([])

    try {
      const applicants = await getOpportunityApplicants(opportunityId)
      setEnrolledVolunteers(applicants || [])
    } catch {
      setEnrolledVolunteers([])
    } finally {
      setEnrolledLoading(false)
    }
  }, [expandedId])

  // Create flow
  const handleCreate = () => {
    setEditingOpportunity(null)
    setSubmitError(null)
    setShowFormModal(true)
  }

  // Edit flow
  const handleEdit = (opportunity) => {
    setEditingOpportunity(opportunity)
    setSubmitError(null)
    setShowFormModal(true)
  }

  // Delete flow
  const handleDeleteInit = (opportunity) => {
    setDeletingOpportunity(opportunity)
    setShowDeleteModal(true)
  }

  // Form submit handler (create or update)
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      if (editingOpportunity) {
        await updateOpportunity(editingOpportunity.id, formData)
      } else {
        await createOpportunity(formData)
      }
      setShowFormModal(false)
      setEditingOpportunity(null)
      await fetchOpportunities()
    } catch (err) {
      const message = err.response?.data?.message || err.message || 
        (editingOpportunity ? "Update failed. Please try again." : "Creation failed. Please try again.")
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Form cancel
  const handleFormCancel = () => {
    setShowFormModal(false)
    setEditingOpportunity(null)
    setSubmitError(null)
  }

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!deletingOpportunity) return

    try {
      await deleteOpportunity(deletingOpportunity.id)
      setShowDeleteModal(false)
      setDeletingOpportunity(null)
      // If the deleted card was expanded, collapse it
      if (expandedId === deletingOpportunity.id) {
        setExpandedId(null)
        setEnrolledVolunteers([])
      }
      await fetchOpportunities()
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Deletion failed. Please try again."
      setError(message)
      setShowDeleteModal(false)
      setDeletingOpportunity(null)
    }
  }

  // Cancel delete
  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setDeletingOpportunity(null)
  }

  return (
    <div className="flex min-h-screen bg-tertiary-light">
      <ShelterDashboardSidebar shelterName={shelterName} />

      <main className="flex-1 md:ml-64 p-6 md:p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Manage Opportunities
          </h1>
          <p className="text-secondary-dark mt-2">
            Create, edit, and manage your shelter's volunteer opportunities.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchOpportunities} />
        ) : (
          <OpportunityCardList
            opportunities={opportunities}
            onEdit={handleEdit}
            onDelete={handleDeleteInit}
            onCreate={handleCreate}
            onExpand={handleExpand}
            expandedId={expandedId}
            enrolledVolunteers={enrolledVolunteers}
            enrolledLoading={enrolledLoading}
          />
        )}

        {/* Create/Edit Form Modal */}
        {showFormModal && (
          <OpportunityFormModal
            opportunity={editingOpportunity}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          opportunityName={deletingOpportunity?.name || ""}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </main>
    </div>
  )
}
