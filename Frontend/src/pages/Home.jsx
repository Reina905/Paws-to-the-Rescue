import { HomeHero } from "../features/home/HomeHero"
import { HomeAboutPreview } from "../features/home/HomeAboutPreview"
import { HomeImpactStats } from "../features/home/HomeImpactStats"
import { HomeVolunteeringSection } from "../features/home/HomeVolunteeringSection"
import { HomeVolunteersOfMonth } from "../features/home/HomeVolunteersOfMonth"
import { JoinCommunity } from "../features/home/JoinCommunity"
import { MainLayout } from "../layouts/MainLayout"
import HeroHomeBackground from "/src/assets/HeroStaticResources/HomeHeroBackgroundVideo.mp4"

export const Home = () => {
  return (
    <MainLayout
      backgroundType="video"
      backgroundSrc={HeroHomeBackground}
      hero={<HomeHero />}
    >
        <HomeAboutPreview />
        <HomeImpactStats />
        <HomeVolunteeringSection />
        <JoinCommunity />
    </MainLayout>
  )
}
