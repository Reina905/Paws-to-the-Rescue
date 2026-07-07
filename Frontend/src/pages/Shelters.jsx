import { SheltersList } from "../features/shelters/SheltersList"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { ErrorMessage } from "../components/ErrorMessage"
import { EmptyState } from "../components/EmptyState"
import { useShelters } from "../hooks/useShelters"
import { Navbar } from "../layouts/Navbar/Navbar"
import { Footer } from "../layouts/Footer"
import { PaddingLayout } from "../layouts/PaddingLayout"
import { SectionHeader } from "../components/SectionHeader"

export const Shelters = () => {
  const { data, loading, error, refetch } = useShelters()

  return (
    <>
      <Navbar variant="light" />
      <section className="bg-white py-30">
        <PaddingLayout>
          <SectionHeader
            title="Our Partner Shelters"
            subtitle="Discover shelters near you and find opportunities to make a real difference in the lives of rescued cats."
            className="mb-12"
          />
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} onRetry={refetch} />}
          {!loading && !error && data?.length === 0 && (
            <EmptyState message="No hay refugios registrados en este momento." />
          )}
          {!loading && !error && data?.length > 0 && (
            <SheltersList shelters={data} />
          )}
        </PaddingLayout>
      </section>
      <Footer />
    </>
  )
}
