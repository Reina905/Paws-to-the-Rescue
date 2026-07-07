import { ShelterDashboardSidebar } from "../features/shelterDashboard/ShelterDashboardSidebar"
import { ShelterDashboardStats } from "../features/shelterDashboard/ShelterDashboardStats"
import { ShelterDashboardRegistrations } from "../features/shelterDashboard/ShelterDashboardRegistrations"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { useShelterDashboard, useShelterRecentRegistrations } from "../hooks/useShelters"
import { useAuthStore } from "../store/authStore"

export const ShelterDashboard = () => {
  const { data: stats, loading: loadingStats, error: statsError } = useShelterDashboard()
  const { data: registrations, loading: loadingRegs, error: regsError } = useShelterRecentRegistrations()
  const user = useAuthStore((state) => state.user)

  const shelterName = stats?.name || user?.user_metadata?.name || "My Shelter"

  // Default stats so cards always render
  const displayStats = {
    totalAnimals: stats?.totalAnimals ?? 0,
    volunteers: stats?.volunteers ?? 0,
    activeOpportunities: stats?.activeOpportunities ?? 0,
  }

  return (
    <div className="flex min-h-screen bg-tertiary-light">
      <ShelterDashboardSidebar shelterName={shelterName} />

      <main className="flex-1 md:ml-64 p-6 md:p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Welcome back, {shelterName}
          </h1>
          <p className="text-secondary-dark mt-2">
            Manage your volunteers, opportunities, and shelter impact.
          </p>
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
    </div>
  )
}
