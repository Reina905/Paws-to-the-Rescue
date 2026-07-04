import { HomeHeader } from "../features/home/HomeHeader"
import { HomeAboutPreview } from "../features/home/HomeAboutPreview"
import { HomeImpactStats } from "../features/home/HomeImpactStats"
import { HomeVolunteeringSection } from "../features/home/HomeVolunteeringSection"
import { HomeVolunteersOfMonth } from "../features/home/HomeVolunteersOfMonth"
import { JoinCommunity } from "../features/home/JoinCommunity"
import { MainLayout } from "../layouts/MainLayout"

export const Home = () => {
  return (
    // MainLayout with withNavbar=false because HomeHeader already includes the Navbar
    <MainLayout withNavbar={false}>
      <HomeHeader />
      <main className="relative overflow-hidden isolate">
        <HomeAboutPreview />
        <HomeImpactStats />
        <HomeVolunteeringSection />
        <HomeVolunteersOfMonth />
        <JoinCommunity />
      </main>
    </MainLayout>
  )
}
