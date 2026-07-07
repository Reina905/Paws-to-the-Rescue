import { VolunteeringCard } from "../volunteering/VolunteeringCard"
import { SectionHeader } from "../../components/SectionHeader"
import { SecondaryNavLink } from "../../layouts/Navbar/SecondaryNavLink"
import { ArrowRight } from "lucide-react"
import { PaddingLayout } from "../../layouts/PaddingLayout"
import { useOpportunities } from "../../hooks/useOpportunities"
import { LoadingSpinner } from "../../components/LoadingSpinner"
import { ErrorMessage } from "../../components/ErrorMessage"

export const HomeVolunteeringSection = () => {
  const { data, loading, error, refetch } = useOpportunities()

  return (
    <section className=" py-20">
      <SectionHeader
        title="Volunteer Opportunities"
        subtitle="Find active opportunities to help shelters and make a real impact in the lives of rescued cats."
        className="mb-14"
      />
      <PaddingLayout>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.slice(0, 3).map((item) => (
            <VolunteeringCard key={item.id} {...item} />
          ))}
        </div>
      )}

      <div className="ml-auto flex pt-15 justify-center items-center">
        <SecondaryNavLink to={"/volunteering"} className={"group text-white bg-primary hover:bg-primary-dark"}>
          View More Opportunities <ArrowRight className="inline-block size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </SecondaryNavLink>
      </div>
      </PaddingLayout>
    </section>
  )
}
