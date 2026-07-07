import { formatRelativeTime } from "../../utils/relativeTime"
import { EmptyState } from "../../components/EmptyState"

const statusConfig = {
  pending: { label: "Pending", classes: "bg-yellow-100 text-yellow-800" },
  approved: { label: "Approved", classes: "bg-green-100 text-green-800" },
  rejected: { label: "Rejected", classes: "bg-red-100 text-red-800" },
}

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.pending
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${config.classes}`}
    >
      {config.label}
    </span>
  )
}

const ApplicationCard = ({ name, role, time, status, createdAt }) => {
  const displayTime = createdAt ? formatRelativeTime(createdAt) : time

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
      <div className="text-right flex flex-col items-end gap-1">
        <StatusBadge status={status} />
        <p className="text-secondary-dark text-xs">{displayTime}</p>
      </div>
    </div>
  )
}

export const ShelterDashboardApplications = ({ applications }) => {
  if (!applications || applications.length === 0) {
    return (
      <EmptyState message="No recent applications yet. When volunteers apply to your opportunities, they'll show up here." />
    )
  }

  return (
    <div className="space-y-4">
      {applications.map((app, i) => (
        <ApplicationCard key={i} {...app} />
      ))}
    </div>
  )
}
