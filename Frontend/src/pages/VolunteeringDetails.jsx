import { useParams, useNavigate } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"
import { PaddingLayout } from "../layouts/PaddingLayout"
import { VolunteeringDetailCard } from "../features/volunteering/VolunteeringDetailCard"
import { volunteeringData } from "../services/volunteeringData"
import { Navbar } from "../layouts/Navbar/Navbar"
import { Footer } from "../layouts/Footer"

export const VolunteeringDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const opportunity = volunteeringData.find((item) => item.id === id)

  if (!opportunity) {
    return <div className="p-10">Opportunity not found</div>
  }

  return (
    <>
    <Navbar variant="light" />
      <main className="py-24">
        <PaddingLayout>
          {/* Back button */}
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 font-semibold py-2 px-3 rounded-xl text-primary hover:bg-secondary-light transition-all duration-300 ease-in-out hover:-translate-y-0.5 text-sm"
            >
              ← Back
            </button>
          </div>

          <VolunteeringDetailCard opportunity={opportunity} />
        </PaddingLayout>
      </main>
      <Footer/>
    </>
  )
}
