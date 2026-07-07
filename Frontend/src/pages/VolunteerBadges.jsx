import { DashboardSidebar } from "../features/volunteerDashboard/DashboardSidebar"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { EmptyState } from "../components/EmptyState"
import { useVolunteerDashboard, useVolunteerBadges } from "../hooks/useVolunteers"
import { Award } from "lucide-react"

export const VolunteerBadges = () => {
  const { data: volunteer } = useVolunteerDashboard()
  const { data: badges, loading, error } = useVolunteerBadges()

  const volunteerName = volunteer?.name || "Volunteer"

  return (
    <div className="flex min-h-screen bg-tertiary-light">
      <DashboardSidebar userName={volunteerName} />

      <main className="flex-1 md:ml-64 p-6 md:p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            My Badges
          </h1>
          <p className="text-secondary-dark mt-2">
            Achievements earned through your volunteer work.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-white rounded-2xl p-6 border border-primary-light">
            <p className="text-sm text-secondary-dark">Could not load badges.</p>
          </div>
        ) : !badges || badges.length === 0 ? (
          <EmptyState message="No badges earned yet. Keep volunteering to unlock achievements!" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {badges.map((badge, index) => (
              <div
                key={badge.id || index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
              >
                {badge.url_image || badge.urlImage ? (
                  <img
                    src={badge.url_image || badge.urlImage}
                    alt={badge.name}
                    className="w-20 h-20 rounded-full object-cover mb-4"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mb-4">
                    <Award size={32} className="text-primary" />
                  </div>
                )}
                <h3 className="font-semibold text-primary text-lg">{badge.name}</h3>
                {badge.description && (
                  <p className="text-sm text-secondary-dark mt-2">{badge.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
