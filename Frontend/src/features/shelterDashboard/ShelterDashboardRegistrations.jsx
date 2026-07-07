import { EmptyState } from "../../components/EmptyState"

const RegistrationCard = ({ name, role, time }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
          <span className="text-primary font-bold text-sm">
            {name?.charAt(0)?.toUpperCase() || "?"}
          </span>
        </div>
        <div>
          <p className="font-semibold text-primary">{name}</p>
          <p className="text-secondary-dark text-sm">{role}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Registered
        </span>
        <p className="text-secondary-dark text-xs mt-1">{time}</p>
      </div>
    </div>
  )
}

export const ShelterDashboardRegistrations = ({ registrations }) => {
  if (!registrations || registrations.length === 0) {
    return (
      <EmptyState message="No volunteer sign-ups yet. When volunteers register for your opportunities, they'll show up here." />
    )
  }

  return (
    <div className="space-y-4">
      {registrations.map((reg, i) => (
        <RegistrationCard key={i} {...reg} />
      ))}
    </div>
  )
}
