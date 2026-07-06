import { useState, useMemo } from "react"
import { VolunteeringCard } from "./VolunteeringCard"
import { VolunteeringFilters } from "./VolunteeringFilters"
import CryingCat from "../../assets/CartoonResources/CryingCat.png"

export const VolunteeringList = ({ opportunities }) => {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeLocation, setActiveLocation] = useState("All")

  const categories = useMemo(
    () => [...new Set(opportunities.map((o) => o.category))],
    [opportunities]
  )
  const locations = useMemo(
    () => [...new Set(opportunities.map((o) => o.location))],
    [opportunities]
  )

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return opportunities.filter((o) => {
      const matchesSearch =
        !q ||
        o.name?.toLowerCase().includes(q) ||
        o.shelterName?.name?.toLowerCase().includes(q) ||
        o.location?.toLowerCase().includes(q)

      const matchesCategory =
        activeCategory === "All" || o.category === activeCategory

      const matchesLocation =
        activeLocation === "All" || o.location === activeLocation

      return matchesSearch && matchesCategory && matchesLocation
    })
  }, [opportunities, search, activeCategory, activeLocation])

  return (
    <div>
      <VolunteeringFilters
        search={search}
        onSearchChange={setSearch}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        locations={locations}
        activeLocation={activeLocation}
        onLocationChange={setActiveLocation}
        totalResults={filtered.length}
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <VolunteeringCard key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center text-primary">
          <img src={CryingCat} alt="No results" className="h-30 mb-3" />
          <p className="text-lg font-semibold">No opportunities found</p>
          <p className="text-sm mt-1 text-secondary-dark">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
