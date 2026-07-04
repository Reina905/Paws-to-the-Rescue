const ApplicationCard = ({ name, role, time }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center">
    <div>
      <p className="font-bold">{name}</p>
      <p className="text-gray-500 text-sm">{role}</p>
    </div>
    <div className="text-right">
      <p className="text-gray-400 text-sm">{time}</p>
      <div className="flex gap-2 mt-2">
        <button className="text-green-600 font-semibold text-sm">Approve</button>
        <button className="text-red-500 font-semibold text-sm">Reject</button>
      </div>
    </div>
  </div>
)

export const ShelterDashboardApplications = ({ applications }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Recent Applications</h3>
      {applications.map((app, i) => (
        <ApplicationCard key={i} {...app} />
      ))}
    </div>
  )
}
