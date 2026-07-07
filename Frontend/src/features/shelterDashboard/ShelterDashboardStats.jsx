const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <p className="text-secondary-dark text-sm font-medium">{title}</p>
    <p className="text-3xl font-bold text-primary mt-1">{value}</p>
  </div>
)

export const ShelterDashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <StatCard title="Registered Volunteers" value={stats.volunteers} />
      <StatCard title="Active Opportunities" value={stats.activeOpportunities} />
    </div>
  )
}
