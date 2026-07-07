const QuickAction = ({ title, desc, onClick }) => (
  <div
    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick?.()
      }
    }}
  >
    <p className="font-bold">{title}</p>
    <p className="text-gray-500 text-sm mt-1">{desc}</p>
  </div>
)

export const ShelterDashboardQuickActions = ({ actions }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Quick Actions</h3>
      {actions.map((action, i) => (
        <QuickAction key={i} {...action} />
      ))}
    </div>
  )
}
