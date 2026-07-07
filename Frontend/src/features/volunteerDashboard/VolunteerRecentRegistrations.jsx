import { useState } from "react"
import { MapPin, Calendar, X } from "lucide-react"
import { EmptyState } from "../../components/EmptyState"
import { ErrorMessage } from "../../components/ErrorMessage"
import { LoadingSpinner } from "../../components/LoadingSpinner"
import { withdrawFromOpportunity } from "../../services/opportunitiesService"
import { formatDate } from "../../utils/formatDate"

const RegistrationCard = ({ id, opportunityId, title, shelter, location, date, onWithdraw }) => {
  const [withdrawing, setWithdrawing] = useState(false)

  const handleWithdraw = async () => {
    if (!opportunityId) return
    setWithdrawing(true)
    try {
      await withdrawFromOpportunity(opportunityId)
      onWithdraw(id || opportunityId)
    } catch {
      // Error silently handled — card stays
    } finally {
      setWithdrawing(false)
    }
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <div className="flex justify-between items-start gap-2">
        <h4 className="font-bold text-sm">{title}</h4>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-800 whitespace-nowrap">
            Registered
          </span>
          <button
            onClick={handleWithdraw}
            disabled={withdrawing}
            className="text-xs px-2 py-1 rounded-full font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 flex items-center gap-1"
            title="Withdraw from this opportunity"
          >
            <X size={12} />
            {withdrawing ? "..." : "Withdraw"}
          </button>
        </div>
      </div>
      <p className="text-gray-500 text-sm mt-1">{shelter}</p>
      <div className="flex items-center gap-4 text-gray-400 text-xs mt-2">
        <span className="flex items-center gap-1">
          <MapPin size={12} />
          {location}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {formatDate(date)}
        </span>
      </div>
    </div>
  )
}

export const VolunteerRecentRegistrations = ({ registrations, isLoading, error, onWithdraw }) => {
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
        <RegistrationCard
          key={reg.id || i}
          {...reg}
          onWithdraw={onWithdraw || (() => {})}
        />
      ))}
    </div>
  )
}
