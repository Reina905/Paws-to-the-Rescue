import { MapPin, Calendar, Clock, Tag } from "lucide-react"

export const ParticipationHistoryCard = ({
  opportunityName,
  shelterName,
  location,
  date,
  hours,
  category,
}) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm">
    <h4 className="font-bold text-sm">{opportunityName}</h4>
    <p className="text-gray-500 text-sm mt-1">{shelterName}</p>
    <div className="flex flex-wrap items-center gap-4 text-gray-400 text-xs mt-2">
      <span className="flex items-center gap-1">
        <MapPin size={12} />
        {location}
      </span>
      <span className="flex items-center gap-1">
        <Calendar size={12} />
        {date}
      </span>
      <span className="flex items-center gap-1">
        <Clock size={12} />
        {hours} hours
      </span>
    </div>
    <div className="mt-2">
      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 font-medium">
        <Tag size={10} />
        {category}
      </span>
    </div>
  </div>
)
