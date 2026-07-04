import { motion } from "framer-motion"
import { Clock, CheckCircle, XCircle, AlertCircle, Calendar, MapPin } from "lucide-react"

const StatusBadge = ({ status }) => {
  const map = {
    pending: { icon: <AlertCircle size={14} />, className: "bg-yellow-100 text-yellow-700", label: "Pending" },
    approved: { icon: <CheckCircle size={14} />, className: "bg-green-100 text-green-700", label: "Approved" },
    rejected: { icon: <XCircle size={14} />, className: "bg-red-100 text-red-600", label: "Rejected" },
  }
  const s = map[status]
  return (
    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${s.className}`}>
      {s.icon}
      {s.label}
    </span>
  )
}

export const ApplicationsList = ({ applications }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {applications.map((app, index) => (
        <motion.div
          key={app.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{app.title}</h3>
              <p className="text-gray-500 text-sm">{app.shelter}</p>
            </div>
            <StatusBadge status={app.status} />
          </div>

          <div className="mt-5 space-y-2 text-gray-600 text-sm">
            <div className="flex items-center gap-2"><MapPin size={14} />{app.location}</div>
            <div className="flex items-center gap-2"><Calendar size={14} />{app.date}</div>
            <div className="flex items-center gap-2"><Clock size={14} />{app.hours} hours</div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            {app.status === "pending" && (
              <>
                <button className="px-4 py-2 text-sm rounded-full bg-green-100 text-green-700 font-semibold">Edit</button>
                <button className="px-4 py-2 text-sm rounded-full bg-red-100 text-red-600 font-semibold">Cancel</button>
              </>
            )}
            {app.status === "approved" && (
              <button className="px-4 py-2 text-sm rounded-full bg-primary text-white font-semibold">View Details</button>
            )}
            {app.status === "rejected" && (
              <button className="px-4 py-2 text-sm rounded-full bg-gray-100 text-gray-600 font-semibold">Apply Again</button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
