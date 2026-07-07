import { PawPrint, Users, Calendar } from "lucide-react"

const StatCard = ({ title, value, icon, accent }) => (
  <div className="bg-white p-6 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-secondary-dark text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-primary mt-1">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${accent}`}>
        {icon}
      </div>
    </div>
  </div>
)

export const ShelterDashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Animals in Care"
        value={stats.totalAnimals}
        icon={<PawPrint size={22} className="text-primary" />}
        accent="bg-primary-light"
      />
      <StatCard
        title="Registered Volunteers"
        value={stats.volunteers}
        icon={<Users size={22} className="text-tertiary" />}
        accent="bg-secondary-light"
      />
      <StatCard
        title="Active Opportunities"
        value={stats.activeOpportunities}
        icon={<Calendar size={22} className="text-primary-dark" />}
        accent="bg-primary-light"
      />
    </div>
  )
}
