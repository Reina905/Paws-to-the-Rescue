import { Clock, CheckCircle, XCircle } from "lucide-react"

const FilterButton = ({ active, label, icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition ${
      active ? "bg-primary text-white" : "bg-white text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon}
    {label}
  </button>
)

export const ApplicationFilters = ({ current, onChange }) => {
  return (
    <div className="flex gap-3 flex-wrap mb-10">
      <FilterButton active={current === "all"} onClick={() => onChange("all")} label="All" />
      <FilterButton active={current === "pending"} onClick={() => onChange("pending")} label="Pending" icon={<Clock size={14} />} />
      <FilterButton active={current === "approved"} onClick={() => onChange("approved")} label="Approved" icon={<CheckCircle size={14} />} />
      <FilterButton active={current === "rejected"} onClick={() => onChange("rejected")} label="Rejected" icon={<XCircle size={14} />} />
    </div>
  )
}
