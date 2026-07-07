import { useParams, useNavigate } from "react-router-dom"
import { PaddingLayout } from "../layouts/PaddingLayout"
import { VolunteeringDetailCard } from "../features/volunteering/VolunteeringDetailCard"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { ErrorMessage } from "../components/ErrorMessage"
import { useOpportunityDetail } from "../hooks/useOpportunities"
import { Navbar } from "../layouts/Navbar/Navbar"
import { Footer } from "../layouts/Footer"

export const VolunteeringDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: opportunity, loading, error, refetch } = useOpportunityDetail(id)

  if (loading) {
    return (
      <>
        <Navbar variant="light" />
        <main className="py-24"><PaddingLayout><LoadingSpinner /></PaddingLayout></main>
        <Footer />
      </>
    )
  }

  if (error) {
    const is404 = error.includes?.('404') || error.toLowerCase?.().includes?.('not found')
    return (
      <>
        <Navbar variant="light" />
        <main className="py-24">
          <PaddingLayout>
            {is404 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Opportunity not found.</p>
              </div>
            ) : (
              <ErrorMessage message={error} onRetry={refetch} />
            )}
          </PaddingLayout>
        </main>
        <Footer />
      </>
    )
  }

  if (!opportunity) {
    return (
      <>
        <Navbar variant="light" />
        <main className="py-24">
          <PaddingLayout>
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Opportunity not found.</p>
            </div>
          </PaddingLayout>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar variant="light" />
      <main className="py-24">
        <PaddingLayout>
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
      <Footer />
    </>
  )
}
