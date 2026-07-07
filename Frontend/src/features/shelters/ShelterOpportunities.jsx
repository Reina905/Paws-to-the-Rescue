import { VolunteeringCard } from "../volunteering/VolunteeringCard"
import { SectionHeader } from "../../components/SectionHeader"
import { PaddingLayout } from "../../layouts/PaddingLayout"

export const ShelterOpportunities = ({ opportunities, shelter }) => {
  if (!opportunities || opportunities.length === 0) {
    return (
      <section className="bg-white py-20">
        <PaddingLayout>
          <SectionHeader
            title="Active Volunteer Opportunities"
            subtitle="Join the shelter in its daily mission and help improve the lives of rescued cats through meaningful volunteer work."
            className="mb-12"
          />
          <p className="text-center text-gray-500">No hay oportunidades activas en este momento.</p>
        </PaddingLayout>
      </section>
    )
  }

  return (
    <section className="bg-white py-20">
      <PaddingLayout>
        <SectionHeader
          title="Active Volunteer Opportunities"
          subtitle="Join the shelter in its daily mission and help improve the lives of rescued cats through meaningful volunteer work."
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {opportunities.map((op) => (
            <VolunteeringCard
              key={op.id}
              {...op}
              shelterName={shelter ? { name: shelter.name, logo: shelter.logo } : { name: 'Unknown', logo: '' }}
              image={op.image || shelter?.logo || ''}
            />
          ))}
        </div>
      </PaddingLayout>
    </section>
  )
}
