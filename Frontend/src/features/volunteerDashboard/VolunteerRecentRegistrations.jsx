import { MapPin, Calendar } from "lucide-react"
import { EmptyState } from "../../components/EmptyState"
import { ErrorMessage } from "../../components/ErrorMessage"
import { LoadingSpinner } from "../../components/LoadingSpinner"

const RegistrationCard = ({ title, shelter, location, date }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm">
    <div className="flex justify-between items-start gap-2">
      <h4 className="font-bold text-sm">{title}</h4>
      <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-800 whitespace-nowrap">
        Registered
      </span>
    </div>
    <p className="text-gray-500 text-sm mt-1">{shelter}</p>
    <div className="flex items-center gap-4 text-gray-400 text-xs mt-2">
      <span className="flex items-center gap-1">
        <MapPin size={12} />
        {location}
      </span>
      <span className="flex items-center gap-1">
        <Calendar size={12} />
        {date}
      </span>
    </div>
  </div>
)

export const VolunteerRecentRegistrations = ({ registrations, isLoading, error }) => {
  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message="Registrations could not be retrieved." />
  }

  if (!registrations || registrations.length === 0) {
    return <EmptyState message="You haven't registered for any opportunity yet." />
  }

  const recentRegistrations = registrations.slice(0, 5)

  return (
    <div className="space-y-4">
      {recentRegistrations.map((reg, i) => (
        <RegistrationCard key={reg.id || i} {...reg} />
      ))}
    </div>
  )
}
