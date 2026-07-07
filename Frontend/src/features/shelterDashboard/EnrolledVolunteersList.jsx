import { Users } from "lucide-react"

export const EnrolledVolunteersList = ({ volunteers, isLoading }) => {
  if (isLoading) {
    return (
      <div className="py-3 px-4">
        <div className="flex items-center gap-2 text-secondary-dark text-sm">
          <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
          <span>Loading volunteers...</span>
        </div>
      </div>
    )
  }

  if (!volunteers || volunteers.length === 0) {
    return (
      <div className="py-3 px-4">
        <div className="flex items-center gap-2 text-secondary-dark text-sm">
          <Users size={16} className="text-secondary" />
          <span>No volunteers currently enrolled</span>
        </div>
      </div>
    )
  }

  return (
    <div className="py-3 px-4">
      <p className="text-xs font-semibold text-secondary-dark uppercase tracking-wide mb-2">
        Enrolled Volunteers
      </p>
      <ul className="space-y-1">
        {volunteers.map((volunteer, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-primary">
            <div className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center">
              <span className="text-primary font-bold text-xs">
                {volunteer.name?.charAt(0)?.toUpperCase() || "?"}
              </span>
            </div>
            <span>{volunteer.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
