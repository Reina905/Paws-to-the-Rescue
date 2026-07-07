import { MapPin, Calendar } from "lucide-react"
import { EmptyState } from "../../components/EmptyState"
import { ErrorMessage } from "../../components/ErrorMessage"
import { LoadingSpinner } from "../../components/LoadingSpinner"

const statusColors = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
}

const ApplicationCard = ({ title, shelter, location, date, status }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm">
    <div className="flex justify-between items-start gap-2">
      <h4 className="font-bold text-sm">{title}</h4>
      <span
        className={`text-xs px-2 py-1 rounded-full font-medium capitalize whitespace-nowrap ${statusColors[status] || "bg-gray-100 text-gray-800"}`}
      >
        {status}
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

export const VolunteerRecentApplications = ({ applications, isLoading, error }) => {
  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message="Applications could not be retrieved." />
  }

  if (!applications || applications.length === 0) {
    return <EmptyState message="No applications have been submitted" />
  }

  const recentApplications = applications.slice(0, 5)

  return (
    <div className="space-y-4">
      {recentApplications.map((app, i) => (
        <ApplicationCard key={app.id || i} {...app} />
      ))}
    </div>
  )
}
