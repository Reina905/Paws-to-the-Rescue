import { PaddingLayout } from "../../layouts/PaddingLayout"
import { ShelterCard } from "./ShelterCard"

export const SheltersList = ({ shelters }) => {
  return (
    <section className="bg-white py-24">
      <PaddingLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {shelters.map((shelter) => (
            <ShelterCard key={shelter.id} shelter={shelter} />
          ))}
        </div>
      </PaddingLayout>
    </section>
  )
}
