import { Plus } from "lucide-react"

export const DashboardHeader = ({ userName }) => {
  return (
    <header className="sticky top-0 bg-white/70 backdrop-blur-md p-6 flex justify-between items-center border-b">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Volunteer Dashboard</h2>
        <p className="text-gray-500">Welcome back, {userName}! You've made a huge difference this month.</p>
      </div>

      <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:opacity-90">
        <Plus size={18} />
        Find a Shift
      </button>
    </header>
  )
}
