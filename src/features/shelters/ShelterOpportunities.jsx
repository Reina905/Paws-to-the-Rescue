import { VolunteeringCard } from "../volunteering/VolunteeringCard"
import { SectionHeader } from "../../components/SectionHeader"

export const ShelterOpportunities = ({ opportunities }) => {
  return (
    <>
      <SectionHeader
        title="Active Volunteer Opportunities"
        subtitle="Join the shelter in its daily mission and help improve the lives of rescued cats through meaningful volunteer work."
        className="mt-16 mb-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-24">
        {opportunities.map((op, index) => (
          <VolunteeringCard key={index} {...op} />
        ))}
      </div>
    </>
  )
}
