import { MainLayout } from "../layouts/MainLayout"
import { ShelterDetailHero } from "../features/shelters/ShelterDetailHero"
import { ShelterOpportunities } from "../features/shelters/ShelterOpportunities"
import ShelterHeroBackground from "../assets/HeroStaticResources/HappyPawsShelter.PNG"

const MOCK_SHELTER = {
  id: 1,
  name: "Happy Paws Shelter",
  logo: "https://i.pravatar.cc/120?img=12",
  description:
    "A nonprofit shelter dedicated to rescuing abandoned and injured cats while helping them find loving homes. Our mission is to ensure every cat receives proper care, medical attention and a safe environment.",
  contactNumber: "+1 (555) 123-4567",
  location: "San José, Costa Rica",
  animalCapacity: 80,
  activeVolunteerOpportunities: 3,
}

const MOCK_OPPORTUNITIES = [
  {
    id: "sd1",
    image: ShelterHeroBackground,
    category: "Care",
    shelterName: { name: MOCK_SHELTER.name, logo: MOCK_SHELTER.logo },
    name: "Feeding and daily care for rescued cats",
    location: MOCK_SHELTER.location,
    date: "Every weekend",
    duration: "Weekends 09:00 - 12:00",
    availableSpaces: 3,
    totalSpaces: 5,
  },
  {
    id: "sd2",
    image: ShelterHeroBackground,
    category: "Cleaning",
    shelterName: { name: MOCK_SHELTER.name, logo: MOCK_SHELTER.logo },
    name: "Cleaning and maintenance of shelter areas",
    location: MOCK_SHELTER.location,
    date: "Every Sunday",
    duration: "Sundays 10:00 - 13:00",
    availableSpaces: 5,
    totalSpaces: 6,
  },
]

export const ShelterDetail = () => {
  return (
    <MainLayout
      backgroundType="image"
      backgroundSrc={ShelterHeroBackground}
      hero={<div />}
    >
      <ShelterDetailHero shelter={MOCK_SHELTER} />
      <ShelterOpportunities opportunities={MOCK_OPPORTUNITIES} />
    </MainLayout>
  )
}
