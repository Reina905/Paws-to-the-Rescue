import { Home, Users, ClipboardList, Calendar, BarChart3, Settings, Building2 } from "lucide-react"
import { SidebarItem } from "../../components/SidebarItem"

const NAV_ITEMS = [
  { icon: <Home size={18} />, label: "Overview", active: true },
  { icon: <Users size={18} />, label: "Volunteers" },
  { icon: <ClipboardList size={18} />, label: "Applications" },
  { icon: <Calendar size={18} />, label: "Opportunities" },
  { icon: <BarChart3 size={18} />, label: "Analytics" },
  { icon: <Settings size={18} />, label: "Settings" },
]

export const ShelterDashboardSidebar = ({ shelterName }) => {
  return (
    <aside className="hidden md:flex w-64 flex-col bg-[#F6E5DF] border-r border-[#D8C2BC]/40 fixed h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">Shelter Panel</h1>
      </div>

      <nav className="flex-1 px-2 space-y-2">
        {NAV_ITEMS.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="p-6 border-t border-[#D8C2BC]/40">
        <div className="flex items-center gap-3">
          <Building2 className="text-primary" />
          <div>
            <p className="font-semibold text-sm">{shelterName}</p>
            <p className="text-[10px] uppercase text-gray-500">Active Shelter</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
