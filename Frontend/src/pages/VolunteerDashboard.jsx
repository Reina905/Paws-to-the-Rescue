import { DashboardSidebar } from "../features/volunteerDashboard/DashboardSidebar"
import { VolunteerDashboardStats } from "../features/volunteerDashboard/VolunteerDashboardStats"
import { VolunteerRecentRegistrations } from "../features/volunteerDashboard/VolunteerRecentRegistrations"
import { VolunteerRecentBadges } from "../features/volunteerDashboard/VolunteerRecentBadges"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { useVolunteerDashboard, useVolunteerRegistrations, useVolunteerBadges } from "../hooks/useVolunteers"

export const VolunteerDashboard = () => {
  const { data: volunteer, loading: loadingProfile, error: profileError } = useVolunteerDashboard()
  const { data: registrations, loading: loadingRegs, error: regsError } = useVolunteerRegistrations()
  const { data: badges, loading: loadingBadges, error: badgesError } = useVolunteerBadges()

  const volunteerName = volunteer?.name || "Volunteer"

  // Ensure metrics default to 0 when no data exists
  const displayVolunteer = {
    totalHours: volunteer?.totalHours ?? 0,
    sheltersAssisted: volunteer?.sheltersAssisted ?? 0,
    role: volunteer?.role || "Volunteer",
    since: volunteer?.since || "—",
  }

  return (
    <div className="flex min-h-screen bg-tertiary-light">
      <DashboardSidebar userName={volunteerName} />

      <main className="flex-1 md:ml-64 p-6 md:p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Welcome back, {volunteerName}
          </h1>
          <p className="text-secondary-dark mt-2">
            Track your volunteer progress and recent activity.
          </p>
        </div>

        {/* Stats */}
        {loadingProfile ? (
          <LoadingSpinner />
        ) : profileError ? (
          <div className="bg-white rounded-2xl p-4 border border-primary-light">
            <p className="text-sm text-secondary-dark">
               Could not load metrics from the server.
            </p>
          </div>
        ) : (
          <VolunteerDashboardStats volunteer={displayVolunteer} />
        )}

        {/* Recent Registrations & Badges */}
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-6">My Registrations</h2>
            <VolunteerRecentRegistrations
              registrations={registrations || []}
              isLoading={loadingRegs}
              error={regsError}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-6">Recent Badges</h2>
            <VolunteerRecentBadges
              badges={badges || []}
              isLoading={loadingBadges}
              error={badgesError}
            />
          </section>
        </div>
      </main>
    </div>
  )
}
