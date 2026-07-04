import { AboutHero } from "../features/about/AboutHero"
import { AboutSection } from "../features/about/AboutSection"
import { ImpactSection } from "../features/about/ImpactSection"
import { SuccessStories } from "../features/about/SuccessStories"
import { CommunityGallery } from "../features/about/CommunityGallery"
import { JoinCommunity } from "../features/home/JoinCommunity"
import { MainLayout } from "../layouts/MainLayout"

export const AboutUs = () => {
  return (
    // withNavbar=false because AboutHero renders its own Header (which includes Navbar)
    <MainLayout withNavbar={false}>
      <main className="overflow-hidden">
        <AboutHero />
        <AboutSection />
        <ImpactSection />
        <SuccessStories />
        <CommunityGallery />
        <JoinCommunity />
      </main>
    </MainLayout>
  )
}
