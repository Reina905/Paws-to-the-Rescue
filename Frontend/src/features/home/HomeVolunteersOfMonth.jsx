import { PawBackground } from "../../components/PawBackground"
import { SectionHeader } from "../../components/SectionHeader"
import { PaddingLayout } from "../../layouts/PaddingLayout"
import { VolunteerPodium } from "../volunteers/VolunteerPodium"

const MOCK_VOLUNTEERS = [
  { place: 1, name: "Sarah Jenkins", hours: 245, label: "Volunteer of the Month" },
  { place: 2, name: "Michael Chen", hours: 185, label: "Shelter Hero" },
  { place: 3, name: "Elena Rodriguez", hours: 142, label: "Shelter Hero" },
]

export const HomeVolunteersOfMonth = () => {
  return (
    <section className="relative py-20 bg-tertiary-light">
      <PawBackground pawColor="text-primary-dark" />
      <PaddingLayout>
        <SectionHeader
          title="Volunteers of the Month"
          subtitle="Meet the incredible people who went above and beyond this month to care for our rescued cats."
          className="mb-16"
        />
        <VolunteerPodium volunteers={MOCK_VOLUNTEERS} />
      </PaddingLayout>
    </section>
  )
}
