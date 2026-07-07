import { Clock, Building2, Award, Calendar } from "lucide-react"

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

export const VolunteerDashboardStats = ({ volunteer }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Hours"
        value={volunteer.totalHours}
        icon={<Clock size={22} className="text-primary" />}
        accent="bg-primary-light"
      />
      <StatCard
        title="Shelters Assisted"
        value={volunteer.sheltersAssisted}
        icon={<Building2 size={22} className="text-tertiary" />}
        accent="bg-secondary-light"
      />
      <StatCard
        title="Role"
        value={volunteer.role || "Volunteer"}
        icon={<Award size={22} className="text-primary-dark" />}
        accent="bg-primary-light"
      />
      <StatCard
        title="Member Since"
        value={volunteer.since || "—"}
        icon={<Calendar size={22} className="text-tertiary" />}
        accent="bg-secondary-light"
      />
    </div>
  )
}
