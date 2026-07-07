import { Calendar, MapPin, Tag, Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { deriveOpportunityStatus } from "../../utils/opportunityStatus"
import { EnrolledVolunteersList } from "./EnrolledVolunteersList"

const statusConfig = {
  open: { label: "Open", classes: "bg-green-100 text-green-800" },
  closed: { label: "Closed", classes: "bg-gray-100 text-gray-800" },
  past_date: { label: "Past Date", classes: "bg-orange-100 text-orange-800" },
  full_capacity: { label: "Full Capacity", classes: "bg-red-100 text-red-800" },
}

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.open
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${config.classes}`}
    >
      {config.label}
    </span>
  )
}

export const OpportunityCard = ({ opportunity, onEdit, onDelete, onExpand, isExpanded }) => {
  const status = deriveOpportunityStatus(opportunity)

  const formattedDate = opportunity.date
    ? new Date(opportunity.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : ""

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-primary text-lg truncate">
                {opportunity.name}
              </h3>
              <StatusBadge status={status} />
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-secondary-dark">
              <span className="flex items-center gap-1">
                <Calendar size={14} className="text-secondary" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} className="text-secondary" />
                {opportunity.location}
              </span>
              <span className="flex items-center gap-1">
                <Tag size={14} className="text-secondary" />
                {opportunity.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onEdit(opportunity)}
              className="p-2 rounded-lg text-secondary-dark hover:bg-primary-light hover:text-primary transition-colors"
              aria-label={`Edit ${opportunity.name}`}
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(opportunity)}
              className="p-2 rounded-lg text-secondary-dark hover:bg-red-50 hover:text-red-600 transition-colors"
              aria-label={`Delete ${opportunity.name}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <button
          onClick={() => onExpand(opportunity.id)}
          className="mt-3 flex items-center gap-1 text-sm text-secondary-dark hover:text-primary transition-colors"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse enrolled volunteers" : "Expand enrolled volunteers"}
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <span>{isExpanded ? "Hide" : "Show"} enrolled volunteers</span>
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-100">
          <EnrolledVolunteersList
            volunteers={opportunity.enrolledVolunteers}
            isLoading={opportunity.enrolledLoading}
          />
        </div>
      )}
    </div>
  )
}
