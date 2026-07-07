import { DashboardSidebar } from "../features/volunteerDashboard/DashboardSidebar"
import { ParticipationHistoryList } from "../features/volunteerDashboard/ParticipationHistoryList"
import { useVolunteerRegistrations, useVolunteerDashboard } from "../hooks/useVolunteers"

export const VolunteerParticipationHistory = () => {
  const { data: volunteer } = useVolunteerDashboard()
  const { data: history, loading, error } = useVolunteerRegistrations()

  const volunteerName = volunteer?.name || "Volunteer"

  return (
    <div className="flex min-h-screen bg-tertiary-light">
      <DashboardSidebar userName={volunteerName} />

      <main className="flex-1 md:ml-64 p-6 md:p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Participation History
          </h1>
          <p className="text-secondary-dark mt-2">
            All the volunteer opportunities you've registered for.
          </p>
        </div>

        {/* History List */}
        <ParticipationHistoryList
          history={history || []}
          isLoading={loading}
          error={error}
        />
      </main>
    </div>
  )
}
