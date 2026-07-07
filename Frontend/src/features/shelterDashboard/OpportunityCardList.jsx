import { Plus } from "lucide-react"
import { OpportunityCard } from "./OpportunityCard"
import { EmptyState } from "../../components/EmptyState"

export const OpportunityCardList = ({
  opportunities,
  onEdit,
  onDelete,
  onCreate,
  onExpand,
  expandedId,
  enrolledVolunteers,
  enrolledLoading,
}) => {
  const sortedOpportunities = [...opportunities].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">Opportunities</h2>
        <button
          onClick={onCreate}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
        >
          <Plus size={18} />
          Create New Opportunity
        </button>
      </div>

      {opportunities.length === 0 ? (
        <EmptyState message="No opportunities exist yet. Create your first one!" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedOpportunities.map((opportunity) => {
            const isExpanded = expandedId === opportunity.id
            const augmentedOpportunity = isExpanded
              ? {
                  ...opportunity,
                  enrolledVolunteers: enrolledVolunteers || [],
                  enrolledLoading: enrolledLoading || false,
                }
              : opportunity

            return (
              <OpportunityCard
                key={opportunity.id}
                opportunity={augmentedOpportunity}
                onEdit={onEdit}
                onDelete={onDelete}
                onExpand={onExpand}
                isExpanded={isExpanded}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
