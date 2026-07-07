import { useParams } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"
import { ShelterDetailHero } from "../features/shelters/ShelterDetailHero"
import { ShelterOpportunities } from "../features/shelters/ShelterOpportunities"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { ErrorMessage } from "../components/ErrorMessage"
import { useShelterDetail } from "../hooks/useShelters"
import ShelterHeroBackground from "../assets/HeroStaticResources/HappyPawsShelter.PNG"
import { Navbar } from "../layouts/Navbar/Navbar"
import { Footer } from "../layouts/Footer"
import { PaddingLayout } from "../layouts/PaddingLayout"

export const ShelterDetail = () => {
  const { id } = useParams()
  const { data: shelter, loading, error, refetch } = useShelterDetail(id)

  if (loading) {
    return (
      <> 
      <Navbar variant="light" />
      <PaddingLayout > 
        <LoadingSpinner />
        </PaddingLayout>
      <Footer/>
      </>
    )
  }

  if (error) {
    const is404 = error.includes?.('404') || error.toLowerCase?.().includes?.('not found')
    return (
      <MainLayout backgroundType="image" backgroundSrc={ShelterHeroBackground} hero={<div />}>
        {is404 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Shelter not found.</p>
          </div>
        ) : (
          <ErrorMessage message={error} onRetry={refetch} />
        )}
      </MainLayout>
    )
  }

  if (!shelter) {
    return (
      <MainLayout backgroundType="image" backgroundSrc={ShelterHeroBackground} hero={<div />}>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Shelter not found.</p>
        </div>
      </MainLayout>
    )
  }

  return (
    <> 
    <Navbar variant="light"/>
    <main className="py-10"> 
      <ShelterOpportunities opportunities={shelter.opportunities || []} shelter={shelter} />
    </main>
    <Footer />
    </>
  )
}
