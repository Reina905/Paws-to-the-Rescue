import { Search, X } from "lucide-react"

const FilterPill = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
      active
        ? "bg-primary text-white border-primary"
        : "bg-white text-secondary-dark border-primary-light hover:border-primary hover:text-primary"
    }`}
  >
    {label}
  </button>
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

      {/* Search bar */}
      <div className="relative max-w-lg">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary pointer-events-none" />
        <input
          type="text"
          placeholder="Search by title, shelter or location…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-10 py-3 rounded-full border border-primary-light text-sm text-primary placeholder:text-tertiary bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary hover:text-primary"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category + Location filters */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold text-tertiary uppercase tracking-wider">Category</span>
        {["All", ...categories].map((cat) => (
          <FilterPill key={cat} label={cat} active={activeCategory === cat} onClick={() => onCategoryChange(cat)} />
        ))}

        <div className="w-px h-5 bg-primary-light mx-1" />

        <span className="text-xs font-semibold text-tertiary uppercase tracking-wider">Location</span>
        {["All", ...locations].map((loc) => (
          <FilterPill key={loc} label={loc} active={activeLocation === loc} onClick={() => onLocationChange(loc)} />
        ))}

        {hasActiveFilters && (
          <button onClick={clearAll} className="ml-2 flex items-center gap-1.5 text-xs font-semibold text-primary-dark hover:text-primary transition">
            <X size={12} />
            Clear all
          </button>
        )}
      </div>

      {/* Result count */}
      <p className="text-sm text-secondary-dark">
        {totalResults} {totalResults === 1 ? "opportunity" : "opportunities"} found
      </p>
    </div>
  )
}
