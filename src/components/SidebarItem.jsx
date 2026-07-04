
export const SidebarItem = ({ icon, label, active }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
      active ? "bg-white text-primary font-bold" : "text-gray-600 hover:bg-white/60"
    }`}
  >
    {icon}
    {label}
  </div>
)
