import { PaddingLayout } from "../../layouts/PaddingLayout"
import { VolunteerCard } from "../volunteers/VolunteerCard"

const MOCK_VOLUNTEERS = [
  { place: 1, name: "Sarah Jenkins", hours: 245 },
  { place: 2, name: "Michael Chen", hours: 185 },
  { place: 3, name: "Elena Rodriguez", hours: 142 },
]

export const HomeVolunteersOfMonth = () => {
  return (
    <section className="py-24">
      <PaddingLayout>
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold">Volunteers of the Month</h2>
        </div>

        <div className="flex justify-center items-end gap-10">
          <VolunteerCard volunteer={MOCK_VOLUNTEERS[1]} />
          <VolunteerCard volunteer={MOCK_VOLUNTEERS[0]} featured />
          <VolunteerCard volunteer={MOCK_VOLUNTEERS[2]} />
        </div>
      </PaddingLayout>
    </section>
  )
}
