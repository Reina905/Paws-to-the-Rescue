import { MainLayout } from "../layouts/MainLayout"
import { PaddingLayout } from "../layouts/PaddingLayout"
import { VolunteeringHero } from "../features/volunteering/VolunteeringHero"
import { VolunteeringList } from "../features/volunteering/VolunteeringList"
import { volunteeringData } from "../services/volunteeringData"

export const Volunteering = () => {
  return (
    <MainLayout>
      <main className="bg-tertiary-light py-24">
        <PaddingLayout>
          <VolunteeringHero />
          <VolunteeringList opportunities={volunteeringData} />
        </PaddingLayout>
      </main>
    </MainLayout>
  )
}
