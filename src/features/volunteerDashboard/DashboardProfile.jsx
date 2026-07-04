import { motion } from "framer-motion"
import { PawPrint, Heart, Star, Award } from "lucide-react"

const Badge = ({ icon, text }) => (
  <span className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm">
    {icon}
    {text}
  </span>
)

export const DashboardProfile = ({ volunteer }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-10">
      {/* Profile card */}
      <motion.div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-md flex gap-6 items-center">
        <img
          src="https://i.pravatar.cc/150"
          className="w-32 h-32 rounded-full border-4 border-[#F2A28C]"
          alt={volunteer.name}
        />
        <div>
          <h3 className="text-2xl font-bold">{volunteer.name}</h3>
          <p className="text-gray-500 mb-3">Dedicated Volunteer since {volunteer.since}</p>
          <div className="flex gap-3 flex-wrap">
            <Badge icon={<PawPrint size={14} />} text="Kitten Guardian" />
            <Badge icon={<Heart size={14} />} text="Super Socializer" />
            <Badge icon={<Star size={14} />} text="Top Contributor" />
          </div>
        </div>
      </motion.div>

      {/* Impact card */}
      <div className="bg-primary text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <h4 className="uppercase text-sm opacity-70 mb-6">Personal Impact</h4>
        <p className="text-4xl font-bold">{volunteer.totalHours}</p>
        <p className="text-sm opacity-70 mb-4">Total Hours</p>
        <p className="text-4xl font-bold">{volunteer.sheltersAssisted}</p>
        <p className="text-sm opacity-70">Shelters Assisted</p>
        <Award className="absolute -bottom-10 -right-10 opacity-10 w-40 h-40" />
      </div>
    </div>
  )
}
