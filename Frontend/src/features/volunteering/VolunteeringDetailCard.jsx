import { ApplyButton } from './ApplyButton';

export const VolunteeringDetailCard = ({ opportunity }) => {
  const shelterDisplay = opportunity.shelterName?.name || 'Unknown Shelter';

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      <img
        src={opportunity.image}
        className="w-full h-96 object-cover"
        alt={opportunity.name}
      />

      <div className="p-10 space-y-6">
        <span className="bg-primary text-white px-4 py-2 rounded-full text-sm">
          {opportunity.category}
        </span>

        <h1 className="text-4xl font-bold">{opportunity.name}</h1>

        <div className="grid grid-cols-2 gap-6 text-gray-700">
          <p className="flex items-center gap-2">
            <strong>Shelter:</strong>
            {opportunity.shelterName?.logo && (
              <img
                src={opportunity.shelterName.logo}
                alt={shelterDisplay}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            {shelterDisplay}
          </p>
          <p><strong>Location:</strong> {opportunity.location}</p>
          <p><strong>Date:</strong> {opportunity.date}</p>
          <p><strong>Duration:</strong> {opportunity.duration}</p>
          <p><strong>Spots:</strong> {opportunity.availableSpaces}/{opportunity.totalSpaces}</p>
        </div>

        <ApplyButton
          opportunityId={opportunity.id}
          status={opportunity.isActive ? 'open' : 'cancelled'}
          availableSpaces={opportunity.availableSpaces || 0}
          onApplySuccess={() => {}}
        />
      </div>
    </div>
  )
}
