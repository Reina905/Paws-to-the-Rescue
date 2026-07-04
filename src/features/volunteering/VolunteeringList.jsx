import { VolunteeringCard } from "./VolunteeringCard"

export const VolunteeringList = ({ opportunities }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {opportunities.map((item) => (
        <VolunteeringCard key={item.id} {...item} />
      ))}
    </div>
  )
}
