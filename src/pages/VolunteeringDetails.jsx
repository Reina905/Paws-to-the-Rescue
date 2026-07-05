import { useParams } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"
import { PaddingLayout } from "../layouts/PaddingLayout"
import { VolunteeringDetailCard } from "../features/volunteering/VolunteeringDetailCard"
import { volunteeringData } from "../services/volunteeringData"
import { Navbar } from "../layouts/Navbar/Navbar"

export const VolunteeringDetails = () => {
  const { id } = useParams()
  const opportunity = volunteeringData.find((item) => item.id === id)

  if (!opportunity) {
    return <div className="p-10">Opportunity not found</div>
  }

  return (
    <>
    <Navbar/>
      <main className="bg-tertiary-light py-24">
        <PaddingLayout>
          <VolunteeringDetailCard opportunity={opportunity} />
        </PaddingLayout>
      </main>
    </>
  )
}
