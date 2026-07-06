import { motion } from "framer-motion"
import { PawPrint, Users, Calendar, Clock } from "lucide-react"

const StatCard = ({ title, value, icon }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between"
  >
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
    <div className="text-primary">{icon}</div>
  </motion.div>
)

export const ShelterDashboardStats = ({ stats }) => {
  return (
    <div className="grid md:grid-cols-4 gap-6 mt-10">
      <StatCard title="Animals in Care" value={stats.totalAnimals} icon={<PawPrint />} />
      <StatCard title="Volunteers" value={stats.volunteers} icon={<Users />} />
      <StatCard title="Active Opportunities" value={stats.activeOpportunities} icon={<Calendar />} />
      <StatCard title="Pending Applications" value={stats.pendingApplications} icon={<Clock />} />
    </div>
  )
}
