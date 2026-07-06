import { Plus } from "lucide-react"

export const ShelterDashboardHeader = () => {
  return (
    <header className="p-6 bg-white/70 backdrop-blur-md border-b flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Shelter Dashboard</h2>
        <p className="text-gray-500">Manage volunteers, opportunities and impact.</p>
      </div>

      <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:opacity-90">
        <Plus size={18} />
        New Opportunity
      </button>
    </header>
  )
}
