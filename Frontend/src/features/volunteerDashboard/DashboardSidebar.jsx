import { Link, useNavigate } from "react-router-dom"
import { LayoutDashboard, History, Award, Home, LogOut } from "lucide-react"
import { useAuthStore } from "../../store/authStore"

const NAV_ITEMS = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", to: "/volunteer-dashboard" },
  { icon: <History size={18} />, label: "Participation History", to: "/volunteer-history" },
  { icon: <Award size={18} />, label: "My Badges", to: "/volunteer-badges" },
  { icon: <Home size={18} />, label: "Back to Home", to: "/" },
]

export const DashboardSidebar = ({ userName }) => {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  return (
    <aside className="hidden md:flex w-64 flex-col bg-secondary-light border-r border-primary-light fixed h-full z-30">
      {/* Logo / Title */}
      <div className="p-6 border-b border-primary-light">
        <h1 className="text-xl font-bold text-primary">Volunteer Hub</h1>
        {userName && (
          <p className="text-sm text-secondary-dark mt-1 truncate">{userName}</p>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ icon, label, to }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-secondary-dark hover:bg-primary-light hover:text-primary font-medium transition-all duration-200"
          >
            {icon}
            <span className="text-sm">{label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-primary-light">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-secondary-dark hover:bg-primary-light hover:text-primary-dark font-medium transition-all duration-200 w-full"
        >
          <LogOut size={18} />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
