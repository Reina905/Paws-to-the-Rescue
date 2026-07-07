import { PawBackground } from "../../components/PawBackground"
import { SectionHeader } from "../../components/SectionHeader"
import { PaddingLayout } from "../../layouts/PaddingLayout"
import { VolunteerPodium } from "../volunteers/VolunteerPodium"
import { useTopVolunteers } from "../../hooks/useVolunteers"
import { LoadingSpinner } from "../../components/LoadingSpinner"
import { ErrorMessage } from "../../components/ErrorMessage"

export const HomeVolunteersOfMonth = () => {
  const { data, loading, error, refetch } = useTopVolunteers()

  return (
    <section className="relative py-20 bg-tertiary-light">
      <PawBackground pawColor="text-primary-dark" />
      <PaddingLayout>
        <SectionHeader
          title="Volunteers of the Month"
          subtitle="Meet the incredible people who went above and beyond this month to care for our rescued cats."
          className="mb-16"
        />
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} onRetry={refetch} />}
        {!loading && !error && <VolunteerPodium volunteers={data || []} />}
      </PaddingLayout>
    </section>
  )
}
