import { ParticipationHistoryCard } from "./ParticipationHistoryCard"
import { EmptyState } from "../../components/EmptyState"
import { ErrorMessage } from "../../components/ErrorMessage"
import { LoadingSpinner } from "../../components/LoadingSpinner"

export const ParticipationHistoryList = ({ history, isLoading, error }) => {
  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message="Participation history could not be retrieved." />
  }

  if (!history || history.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Participation History</h3>
        <EmptyState message="No past participations" />
      </div>
    )
  }

  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Participation History</h3>
      <div className="max-h-[600px] overflow-y-auto space-y-4 pr-1">
        {sortedHistory.map((item, i) => (
          <ParticipationHistoryCard
            key={item.id || i}
            opportunityName={item.title || item.opportunityName}
            shelterName={item.shelter || item.shelterName}
            location={item.location}
            date={item.date}
            hours={item.hours}
            category={item.category}
          />
        ))}
      </div>
    </div>
  )
}
