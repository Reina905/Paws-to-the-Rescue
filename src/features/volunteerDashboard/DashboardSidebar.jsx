import { Home, ClipboardList, CalendarCheck, Store, Settings, HelpCircle, LogOut } from "lucide-react"
import { SidebarItem } from "../../components/SidebarItem"

const NAV_ITEMS = [
  { icon: <Home size={18} />, label: "Dashboard", active: true },
  { icon: <ClipboardList size={18} />, label: "Applications" },
  { icon: <CalendarCheck size={18} />, label: "My Shifts" },
  { icon: <Store size={18} />, label: "Shelter Portal" },
  { icon: <Settings size={18} />, label: "Settings" },
]

export const DashboardSidebar = ({ userName, userRole }) => {
  return (
    <aside className="hidden md:flex w-64 flex-col bg-[#F6E5DF] border-r border-[#D8C2BC]/40 fixed h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">Paws Hub</h1>
      </div>

      <nav className="flex-1 px-2 space-y-2">
        {NAV_ITEMS.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="p-6 border-t border-[#D8C2BC]/40">
        <div className="flex items-center gap-3 mb-6">
          <img src="https://i.pravatar.cc/100" className="w-10 h-10 rounded-full" alt={userName} />
          <div>
            <p className="text-sm font-semibold">{userName}</p>
            <p className="text-[10px] uppercase text-gray-500">{userRole}</p>
          </div>
        </div>
        <SidebarItem icon={<HelpCircle size={18} />} label="Help Center" />
        <SidebarItem icon={<LogOut size={18} />} label="Logout" />
      </div>
    </aside>
  )
}
