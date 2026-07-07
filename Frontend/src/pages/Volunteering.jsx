import { useState } from "react"
import { SectionHeader } from "../components/SectionHeader"
import { PaddingLayout } from "../layouts/PaddingLayout"
import { VolunteeringList } from "../features/volunteering/VolunteeringList"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { ErrorMessage } from "../components/ErrorMessage"
import { EmptyState } from "../components/EmptyState"
import { useOpportunities } from "../hooks/useOpportunities"
import { Navbar } from "../layouts/Navbar/Navbar"
import { Footer } from "../layouts/Footer"

export const Volunteering = () => {
  const [filters, setFilters] = useState({})
  const { data, loading, error, refetch } = useOpportunities(filters)

  return (
    <>
      <Navbar variant="light" />
      <section className="bg-white py-30">
        <PaddingLayout>
          <SectionHeader
            title="Volunteer Opportunities"
            subtitle="Find active opportunities to help shelters and make a real impact in the lives of rescued cats."
            className="mb-12"
          />
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} onRetry={refetch} />}
          {!loading && !error && data?.length === 0 && (
            <EmptyState message="No opportunities available at the moment." />
          )}
          {!loading && !error && data?.length > 0 && (
            <VolunteeringList opportunities={data} />
          )}
        </PaddingLayout>
      </section>
      <Footer />
    </>
  )
}
