import { Search, X, ChevronDown } from "lucide-react"

const SelectFilter = ({ value, onChange, options, placeholder }) => (
  <div className="relative sm:w-44">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none pl-3.5 pr-9 py-2.5 rounded-xl bg-white text-sm text-secondary-dark shadow-sm shadow-primary-light/40 hover:shadow-md hover:shadow-primary-light/50 focus:outline-none focus:shadow-md focus:shadow-primary-light/60 transition-shadow cursor-pointer"
    >
      <option value="All">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-tertiary pointer-events-none" />
  </div>
)

export const VolunteeringFilters = ({
  search,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  locations,
  activeLocation,
  onLocationChange,
  totalResults,
}) => {
  const hasActiveFilters =
    search || activeCategory !== "All" || activeLocation !== "All"

  const clearAll = () => {
    onSearchChange("")
    onCategoryChange("All")
    onLocationChange("All")
  }

  return (
    <div className="flex flex-col gap-4 mb-10">

      {/* Search + filters row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-tertiary pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, shelter or location…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white text-sm text-secondary-dark placeholder:text-text-primary shadow-sm shadow-primary-light/40 hover:shadow-md hover:shadow-primary-light/50 focus:outline-none focus:shadow-md focus:shadow-primary-light/60 transition-shadow"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-tertiary hover:text-primary"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <SelectFilter
          value={activeCategory}
          onChange={onCategoryChange}
          options={categories}
          placeholder="All categories"
        />

        <SelectFilter
          value={activeLocation}
          onChange={onLocationChange}
          options={locations}
          placeholder="All locations"
        />
      </div>

      {/* Result count + clear */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-primary">
          <span className="font-semibold text-secondary-dark">{totalResults}</span>{" "}
          {totalResults === 1 ? "opportunity" : "opportunities"} found
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 text-sm font-medium text-primary-dark hover:text-primary transition-colors"
          >
            <X size={13} />
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}