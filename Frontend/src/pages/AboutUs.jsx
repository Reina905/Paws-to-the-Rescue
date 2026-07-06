import { AboutHero } from "../features/about/AboutHero"
import { AboutSection } from "../features/about/AboutSection"
import { AboutPillars } from "../features/about/AboutPillars"
import { AboutImpact } from "../features/about/AboutImpact"
import { SuccessStories } from "../features/about/SuccessStories"
import { CommunityGallery } from "../features/about/CommunityGallery"
import { JoinCommunity } from "../features/home/JoinCommunity"
import { MainLayout } from "../layouts/MainLayout"
import AboutUsHeroImage from "../assets/HeroStaticResources/AboutUsHeroBackground.PNG"

export const AboutUs = () => {
  return (
        <MainLayout
          backgroundType="image"
          backgroundSrc={AboutUsHeroImage}
          hero={<AboutHero />}
        >
        <AboutSection />
        <AboutPillars />
        <AboutImpact />
        <SuccessStories />
        <CommunityGallery />
    </MainLayout>
  )
}
