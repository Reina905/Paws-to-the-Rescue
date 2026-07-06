import { MainLayout } from "../layouts/MainLayout"
import { VolunteeringHero } from "../features/volunteering/VolunteeringHero"
import { VolunteeringList } from "../features/volunteering/VolunteeringList"
import { SectionHeader } from "../components/SectionHeader"
import { PaddingLayout } from "../layouts/PaddingLayout"
import { volunteeringData } from "../services/volunteeringData"
import VolunteeringHeroBackground from "../assets/HeroStaticResources/VolunteerHelpingWithCleaning.PNG"
import { Navbar } from "../layouts/Navbar/Navbar"
import { Footer } from "../layouts/Footer"

export const Volunteering = () => {
  return (
    <>
    <Navbar variant="light"/>
      <section className="bg-white py-30">
        <PaddingLayout>
          <SectionHeader
            title="Volunteer Opportunities"
            subtitle="Find active opportunities to help shelters and make a real impact in the lives of rescued cats."
            className="mb-12"
          />
          <VolunteeringList opportunities={volunteeringData} />
        </PaddingLayout>
      </section>
      <Footer/>
      </>
  )
}
