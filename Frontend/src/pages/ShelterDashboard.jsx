import { useState } from "react"
import { ShelterDashboardSidebar } from "../features/shelterDashboard/ShelterDashboardSidebar"
import { ShelterDashboardStats } from "../features/shelterDashboard/ShelterDashboardStats"
import { ShelterDashboardRegistrations } from "../features/shelterDashboard/ShelterDashboardRegistrations"
import { OpportunityFormModal } from "../features/shelterDashboard/OpportunityFormModal"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { useShelterDashboard, useShelterRecentRegistrations } from "../hooks/useShelters"
import { useAuthStore } from "../store/authStore"
import { createOpportunity } from "../services/opportunitiesService"
import { Plus } from "lucide-react"

export const ShelterDashboard = () => {
  const { data: stats, loading: loadingStats, error: statsError, refetch: refetchStats } = useShelterDashboard()
  const { data: registrations, loading: loadingRegs, error: regsError } = useShelterRecentRegistrations()
  const user = useAuthStore((state) => state.user)

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const shelterName = stats?.name || user?.user_metadata?.name || "My Shelter"

  const displayStats = {
    volunteers: stats?.volunteers ?? 0,
    activeOpportunities: stats?.activeOpportunities ?? 0,
  }

  const handleCreateClick = () => {
    setSubmitError(null)
    setShowCreateModal(true)
  }

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await createOpportunity(formData)
      setShowCreateModal(false)
      if (refetchStats) refetchStats()
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Creation failed. Please try again."
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFormCancel = () => {
    setShowCreateModal(false)
    setSubmitError(null)
  }

  return (
    <div className="flex min-h-screen bg-tertiary-light">
      <ShelterDashboardSidebar shelterName={shelterName} />

      <main className="flex-1 md:ml-64 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              Welcome back, {shelterName}
            </h1>
            <p className="text-secondary-dark mt-2">
              Manage your volunteers and opportunities.
            </p>
          </div>
          <button
            onClick={handleCreateClick}
            className="flex items-center gap-2 px-5 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Plus size={20} />
            <span>Create Opportunity</span>
          </button>
        </div>

        {/* Stats */}
        {loadingStats ? (
          <LoadingSpinner />
        ) : statsError ? (
          <div className="bg-white rounded-2xl p-4 border border-primary-light">
            <p className="text-sm text-secondary-dark">
               Could not load metrics from the server.
              {statsError.toLowerCase().includes('unauthorized') && (
                <span> Try signing out and logging in again.</span>
              )}
            </p>
          </div>
        ) : (
          <ShelterDashboardStats stats={displayStats} />
        )}

        {/* Recent Registrations */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Recent Volunteer Sign-ups</h2>
          {loadingRegs ? (
            <LoadingSpinner />
          ) : (
            <ShelterDashboardRegistrations registrations={registrations || []} />
          )}
          {regsError && (
            <div className="mt-4 bg-white rounded-2xl p-4 border border-primary-light">
              <p className="text-sm text-secondary-dark">
                 Could not load registrations from the server.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Create Opportunity Modal */}
      {showCreateModal && (
        <OpportunityFormModal
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      )}
    </div>
  )
}
