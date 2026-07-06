import { useState } from "react"
import { Search } from "lucide-react"
import { PaddingLayout } from "../../layouts/PaddingLayout"
import { SectionHeader } from "../../components/SectionHeader"
import { ShelterCard } from "./ShelterCard"

export const SheltersList = ({ shelters }) => {
  const [query, setQuery] = useState("")

  const filtered = shelters.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.location.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section className="bg-white">
        <div className="relative max-w-lg mx-auto mb-12">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or location…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white shadow-md border border-primary-light text-sm text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((shelter) => (
              <ShelterCard key={shelter.id} shelter={shelter} />
            ))}
          </div>
        ) : (
          <p className="text-center text-secondary-dark py-16">
            No shelters found for <span className="font-semibold text-primary">"{query}"</span>.
          </p>
        )}
    </section>
  )
}
