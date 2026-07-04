import { MainLayout } from "../layouts/MainLayout"
import { ShelterDetailHero } from "../features/shelters/ShelterDetailHero"
import { ShelterOpportunities } from "../features/shelters/ShelterOpportunities"
import { PaddingLayout } from "../layouts/PaddingLayout"

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
    image: "/src/assets/VolunteerFeedingCats.PNG",
    category: "Care",
    shelterName: { name: MOCK_SHELTER.name, logo: MOCK_SHELTER.logo },
    title: "Feeding and daily care for rescued cats",
    location: MOCK_SHELTER.location,
    schedule: "Weekends 09:00 - 12:00",
    availableSlots: 3,
    takenSlots: 2,
    totalSlots: 5,
  },
  {
    image: "/src/assets/VolunteerFeedingCats.PNG",
    category: "Cleaning",
    shelterName: { name: MOCK_SHELTER.name, logo: MOCK_SHELTER.logo },
    title: "Cleaning and maintenance of shelter areas",
    location: MOCK_SHELTER.location,
    schedule: "Sundays 10:00 - 13:00",
    availableSlots: 4,
    takenSlots: 1,
    totalSlots: 6,
  },
]

export const ShelterDetail = () => {
  return (
    <MainLayout>
      <main className="bg-tertiary-light min-h-screen">
        <PaddingLayout>
          <ShelterDetailHero shelter={MOCK_SHELTER} />
          <ShelterOpportunities opportunities={MOCK_OPPORTUNITIES} />
        </PaddingLayout>
      </main>
    </MainLayout>
  )
}
