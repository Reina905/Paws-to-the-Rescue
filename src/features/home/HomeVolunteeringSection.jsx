import catImage from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG"
import { VolunteeringCard } from "../volunteering/VolunteeringCard"
import { SectionHeader } from "../../components/SectionHeader"

const MOCK_OPPORTUNITIES = [
  {
    id: "h1",
    image: catImage,
    category: "Limpieza",
    shelterName: { name: "Casa Felina BCN", logo: "https://i.pravatar.cc/40" },
    title: "Limpieza y mantenimiento de instalaciones",
    location: "Barcelona",
    schedule: "Domingos 09:00 - 12:00",
    availableSlots: 2,
    takenSlots: 2,
    totalSlots: 8,
  },
  {
    id: "h2",
    image: catImage,
    category: "Limpieza",
    shelterName: { name: "Casa Felina BCN", logo: "https://i.pravatar.cc/40" },
    title: "Limpieza y mantenimiento de instalaciones",
    location: "Barcelona",
    schedule: "Domingos 09:00 - 12:00",
    availableSlots: 2,
    takenSlots: 2,
    totalSlots: 8,
  },
  {
    id: "h3",
    image: catImage,
    category: "Limpieza",
    shelterName: { name: "Casa Felina BCN", logo: "https://i.pravatar.cc/40" },
    title: "Limpieza y mantenimiento de instalaciones",
    location: "Barcelona",
    schedule: "Domingos 09:00 - 12:00",
    availableSlots: 2,
    takenSlots: 2,
    totalSlots: 8,
  },
  {
    id: "h4",
    image: catImage,
    category: "Limpieza",
    shelterName: { name: "Casa Felina BCN", logo: "https://i.pravatar.cc/40" },
    title: "Limpieza y mantenimiento de instalaciones",
    location: "Barcelona",
    schedule: "Domingos 09:00 - 12:00",
    availableSlots: 2,
    takenSlots: 2,
    totalSlots: 8,
  },
]

export const HomeVolunteeringSection = () => {
  return (
    <section className="bg-tertiary-light py-24 px-10">
      <SectionHeader
        title="Volunteer Opportunities"
        subtitle="Find active opportunities to help shelters and make a real impact in the lives of rescued cats."
        className="mb-14"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_OPPORTUNITIES.map((item) => (
          <VolunteeringCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}
