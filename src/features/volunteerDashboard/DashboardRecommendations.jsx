import { MapPin } from "lucide-react"

const RecommendationCard = ({ title, location, description, tag, simple }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6">
    {tag && (
      <span className="text-xs bg-primary text-white px-3 py-1 rounded-full">{tag}</span>
    )}
    <h4 className="font-bold mt-3">{title}</h4>
    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
      <MapPin size={14} />
      {location}
    </div>
    <p className="text-gray-500 text-sm mt-3">{description}</p>
    <button className="mt-5 w-full bg-primary text-white py-2 rounded-xl font-semibold hover:opacity-90">
      {simple ? "I'm Interested" : "Claim Shift"}
    </button>
  </div>
)

export const DashboardRecommendations = ({ recommendations }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Recommended for You</h3>
      {recommendations.map((rec, i) => (
        <RecommendationCard key={i} {...rec} />
      ))}
    </div>
  )
}
