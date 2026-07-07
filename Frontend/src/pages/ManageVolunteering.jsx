import { useState, useEffect, useCallback } from "react"
import { ShelterDashboardSidebar } from "../features/shelterDashboard/ShelterDashboardSidebar"
import { OpportunityFormModal } from "../features/shelterDashboard/OpportunityFormModal"
import { DeleteConfirmModal } from "../features/shelterDashboard/DeleteConfirmModal"
import { EnrolledVolunteersList } from "../features/shelterDashboard/EnrolledVolunteersList"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { EmptyState } from "../components/EmptyState"
import { useShelterDashboard } from "../hooks/useShelters"
import { useAuthStore } from "../store/authStore"
import { deriveOpportunityStatus } from "../utils/opportunityStatus"
import {
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  getOpportunityApplicants,
  toggleOpportunityStatus,
} from "../services/opportunitiesService"
import { getShelterMyOpportunities } from "../services/sheltersService"
import {
  Plus,
  Calendar,
  MapPin,
  Tag,
  Users,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  Power,
} from "lucide-react"

const statusConfig = {
  open: { label: "Open", classes: "bg-green-100 text-green-800" },
  closed: { label: "Closed", classes: "bg-gray-100 text-gray-800" },
  past_date: { label: "Past Date", classes: "bg-orange-100 text-orange-800" },
  full_capacity: { label: "Full Capacity", classes: "bg-red-100 text-red-800" },
}

export const ManageVolunteering = () => {
  const { data: dashboardData } = useShelterDashboard()
  const user = useAuthStore((state) => state.user)
  const shelterName = dashboardData?.name || user?.user_metadata?.name || "My Shelter"

  // Opportunities state
  const [opportunities, setOpportunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Expanded card — shows enrolled volunteers
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

  // Fetch opportunities
  const fetchOpportunities = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getShelterMyOpportunities()
      setOpportunities(data || [])
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load opportunities")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOpportunities()
  }, [fetchOpportunities])

  // Expand/collapse enrolled volunteers
  const handleToggleVolunteers = useCallback(async (opportunityId) => {
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

  // Create
  const handleCreate = () => {
    setEditingOpportunity(null)
    setSubmitError(null)
    setShowFormModal(true)
  }

  // Edit
  const handleEdit = (opportunity) => {
    setEditingOpportunity(opportunity)
    setSubmitError(null)
    setShowFormModal(true)
  }

  // Delete init
  const handleDeleteInit = (opportunity) => {
    setDeletingOpportunity(opportunity)
    setShowDeleteModal(true)
  }

  // Form submit (create or update)
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
      const message =
        err.response?.data?.message ||
        err.message ||
        (editingOpportunity ? "Update failed. Please try again." : "Creation failed. Please try again.")
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFormCancel = () => {
    setShowFormModal(false)
    setEditingOpportunity(null)
    setSubmitError(null)
  }

  // Toggle active/inactive status
  const handleToggleStatus = async (opportunity) => {
    try {
      await toggleOpportunityStatus(opportunity.id, !opportunity.isActive)
      await fetchOpportunities()
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to update status")
    }
  }

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!deletingOpportunity) return

    try {
      await deleteOpportunity(deletingOpportunity.id)
      setShowDeleteModal(false)
      setDeletingOpportunity(null)
      if (expandedId === deletingOpportunity.id) {
        setExpandedId(null)
        setEnrolledVolunteers([])
      }
      await fetchOpportunities()
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Deletion failed.")
      setShowDeleteModal(false)
      setDeletingOpportunity(null)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setDeletingOpportunity(null)
  }

  // Sort by date descending
  const sortedOpportunities = [...opportunities].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  return (
    <div className="flex min-h-screen bg-tertiary-light">
      <ShelterDashboardSidebar shelterName={shelterName} />

      <main className="flex-1 md:ml-64 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              Manage Volunteering
            </h1>
            <p className="text-secondary-dark mt-2">
              Create, edit, and manage your volunteer opportunities.
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-5 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Plus size={20} />
            <span>New Opportunity</span>
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-white rounded-2xl p-6 border border-primary-light">
            <p className="text-sm text-secondary-dark mb-3">{error}</p>
            <button
              onClick={fetchOpportunities}
              className="text-sm text-primary font-medium hover:underline"
            >
              Try again
            </button>
          </div>
        ) : opportunities.length === 0 ? (
          <EmptyState message="No opportunities yet. Create your first one!" />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {sortedOpportunities.map((opportunity) => {
              const status = deriveOpportunityStatus(opportunity)
              const config = statusConfig[status] || statusConfig.open
              const isExpanded = expandedId === opportunity.id

              const formattedDate = opportunity.date
                ? new Date(opportunity.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : ""

              return (
                <div
                  key={opportunity.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="p-5">
                    {/* Title + Status + Actions */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-primary text-lg truncate">
                            {opportunity.name}
                          </h3>
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${config.classes}`}>
                            {config.label}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-secondary-dark">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} className="text-secondary" />
                            {formattedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-secondary" />
                            {opportunity.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Tag size={14} className="text-secondary" />
                            {opportunity.category}
                          </span>
                        </div>

                        {/* Spaces info */}
                        <p className="text-xs text-secondary-dark mt-2">
                          {opportunity.availableSpaces}/{opportunity.totalSpaces} spaces available
                        </p>
                      </div>

                      {/* Edit / Delete / Toggle actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleToggleStatus(opportunity)}
                          className={`p-2 rounded-lg transition-colors ${
                            opportunity.isActive
                              ? "text-green-600 hover:bg-green-50"
                              : "text-gray-400 hover:bg-gray-100"
                          }`}
                          aria-label={opportunity.isActive ? `Deactivate ${opportunity.name}` : `Activate ${opportunity.name}`}
                          title={opportunity.isActive ? "Deactivate" : "Activate"}
                        >
                          <Power size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(opportunity)}
                          className="p-2 rounded-lg text-secondary-dark hover:bg-primary-light hover:text-primary transition-colors"
                          aria-label={`Edit ${opportunity.name}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteInit(opportunity)}
                          className="p-2 rounded-lg text-secondary-dark hover:bg-red-50 hover:text-red-600 transition-colors"
                          aria-label={`Delete ${opportunity.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* View Volunteers button */}
                    <button
                      onClick={() => handleToggleVolunteers(opportunity.id)}
                      className="mt-3 flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? "Hide enrolled volunteers" : "View enrolled volunteers"}
                    >
                      <Users size={16} />
                      <span>{isExpanded ? "Hide" : "View"} volunteers</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>

                  {/* Enrolled volunteers panel */}
                  {isExpanded && (
                    <div className="border-t border-gray-100">
                      <EnrolledVolunteersList
                        volunteers={enrolledVolunteers}
                        isLoading={enrolledLoading}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Create/Edit Modal */}
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
    </div>
  )
}
