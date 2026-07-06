import catImage from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG"
import { VolunteeringCard } from "../volunteering/VolunteeringCard"
import { SectionHeader } from "../../components/SectionHeader"
import { SecondaryNavLink } from "../../layouts/Navbar/SecondaryNavLink"
import { ArrowRight } from "lucide-react"
import { PaddingLayout } from "../../layouts/PaddingLayout"

const MOCK_OPPORTUNITIES = [
  {
    id: "h1",
    image: catImage,
    category: "Limpieza",
    shelterName: { name: "Casa Felina BCN", logo: "https://i.pravatar.cc/40" },
    name: "Limpieza y mantenimiento de instalaciones",
    location: "Barcelona",
    date: "12/8/2026",
    duration: "Domingos 09:00 - 12:00",
    availableSpaces: 2,
    totalSpaces: 8,
  },
  {
    id: "h2",
    image: catImage,
    category: "Limpieza",
    shelterName: { name: "Casa Felina BCN", logo: "https://i.pravatar.cc/40" },
    name: "Limpieza y mantenimiento de instalaciones",
    location: "Barcelona",
    date: "12/8/2026",
    duration: "Domingos 09:00 - 12:00",
    availableSpaces: 2,
    totalSpaces: 8,
  },
  {
    id: "h3",
    image: catImage,
    category: "Limpieza",
    shelterName: { name: "Casa Felina BCN", logo: "https://i.pravatar.cc/40" },
    name: "Limpieza y mantenimiento de instalaciones",
    location: "Barcelona",
    date: "12/8/2026",
    duration: "Domingos 09:00 - 12:00",
    availableSpaces: 2,
    totalSpaces: 8,
  }
]

export const HomeVolunteeringSection = () => {
  return (
    <section className=" py-20">
      <SectionHeader
        title="Volunteer Opportunities"
        subtitle="Find active opportunities to help shelters and make a real impact in the lives of rescued cats."
        className="mb-14"
      />
      <PaddingLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_OPPORTUNITIES.map((item) => (
          <VolunteeringCard key={item.id} {...item} />
        ))}
      </div>

      <div className="ml-auto flex pt-15 justify-center items-center">
        <SecondaryNavLink to={"/volunteering"} className={"group text-white bg-primary hover:bg-primary-dark"}>
          View More Opportunities <ArrowRight className="inline-block size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </SecondaryNavLink>
      </div>
      </PaddingLayout>
    </section>
  )
}
