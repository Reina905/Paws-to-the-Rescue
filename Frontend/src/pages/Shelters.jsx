import { SheltersHero } from "../features/shelters/SheltersHero"
import { SheltersList } from "../features/shelters/SheltersList"
import { JoinCommunity } from "../features/home/JoinCommunity"
import { MainLayout } from "../layouts/MainLayout"
import ShelterHeroBackground from "../assets/HeroStaticResources/HappyPawsShelter.PNG"
import { Navbar } from "../layouts/Navbar/Navbar"
import { Footer } from "../layouts/Footer"
import { PaddingLayout } from "../layouts/PaddingLayout"
import { SectionHeader } from "../components/SectionHeader"

const MOCK_SHELTERS = [
  {
    id: 1,
    name: "Happy Paws Shelter",
    logo: "https://i.pravatar.cc/100?img=12",
    description: "A nonprofit shelter dedicated to rescuing abandoned and injured cats while helping them find loving homes.",
    contactNumber: "+1 (555) 123-4567",
    location: "San José, Costa Rica",
    animalCapacity: 80,
    activeVolunteerOpportunities: 5,
  },
  {
    id: 2,
    name: "Cat Haven",
    logo: "https://i.pravatar.cc/100?img=24",
    description: "Providing medical care, temporary shelter and adoption opportunities for rescued cats.",
    contactNumber: "+1 (555) 876-5543",
    location: "Heredia, Costa Rica",
    animalCapacity: 120,
    activeVolunteerOpportunities: 8,
  },
  {
    id: 3,
    name: "Safe Whiskers",
    logo: "https://i.pravatar.cc/100?img=34",
    description: "Helping vulnerable cats recover through rehabilitation and community support.",
    contactNumber: "+1 (555) 765-1234",
    location: "Alajuela, Costa Rica",
    animalCapacity: 60,
    activeVolunteerOpportunities: 3,
  },
  {
    id: 4,
    name: "Hope for Cats",
    logo: "https://i.pravatar.cc/100?img=48",
    description: "A rescue organization focused on abandoned kittens and special-needs cats.",
    contactNumber: "+1 (555) 333-4545",
    location: "Cartago, Costa Rica",
    animalCapacity: 45,
    activeVolunteerOpportunities: 6,
  },
]

export const Shelters = () => {
  return (
    <>
      <Navbar variant="light" />
      <section className="bg-white py-30">
        <PaddingLayout>
          <SectionHeader
            title="Our Partner Shelters"
            subtitle="Discover shelters near you and find opportunities to make a real difference in the lives of rescued cats."
            className="mb-12"
          />
          <SheltersList shelters={MOCK_SHELTERS} />
        </PaddingLayout>
      </section>
      <Footer />
    </>
  )
}
