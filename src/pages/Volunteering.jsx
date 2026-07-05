import { MainLayout } from "../layouts/MainLayout"
import { VolunteeringHero } from "../features/volunteering/VolunteeringHero"
import { VolunteeringList } from "../features/volunteering/VolunteeringList"
import { volunteeringData } from "../services/volunteeringData"
import VolunteeringHeroBackground from "../assets/HeroStaticResources/VolunteerHelpingWithCleaning.PNG"

export const Volunteering = () => {
  return (
    <MainLayout
      backgroundType="image"
      backgroundSrc={VolunteeringHeroBackground}
      hero={<VolunteeringHero />}
    >
      <VolunteeringList opportunities={volunteeringData} />
    </MainLayout>
  )
}
