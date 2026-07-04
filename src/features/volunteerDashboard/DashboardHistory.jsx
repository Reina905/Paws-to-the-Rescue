const HistoryItem = ({ title, location, time, hours, note }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <div className="flex justify-between">
      <h4 className="font-bold">{title}</h4>
      <span className="text-gray-400 text-sm">{time}</span>
    </div>
    <p className="text-gray-500 text-sm">{location} • {hours}</p>
    <p className="mt-3 text-sm bg-primary/10 p-3 rounded-lg border-l-4 border-primary">{note}</p>
  </div>
)

export const DashboardHistory = ({ history }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Recent History</h3>
      {history.map((item, i) => (
        <HistoryItem key={i} {...item} />
      ))}
    </div>
  )
}
