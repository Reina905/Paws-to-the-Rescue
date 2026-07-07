export const RoleSelector = ({ selectedRole, onChange }) => {
  const roles = [
    { value: "volunteer", label: "Volunteer" },
    { value: "shelter", label: "Shelter" },
  ]

  return (
    <div className="flex gap-3" role="group" aria-label="Select your role">
      {roles.map(({ value, label }) => {
        const isSelected = selectedRole === value

        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            aria-pressed={isSelected}
            className={`flex-1 px-6 py-3 rounded-full text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              isSelected
                ? "bg-primary text-white"
                : "border border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
