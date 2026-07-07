import { AboutHero } from "../features/about/AboutHero"
import { AboutSection } from "../features/about/AboutSection"
import { AboutPillars } from "../features/about/AboutPillars"
import { CommunityGallery } from "../features/about/CommunityGallery"
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
        <CommunityGallery />
    </MainLayout>
  )
}
