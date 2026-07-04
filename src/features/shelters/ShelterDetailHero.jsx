import { MapPin, Phone, Users, PawPrint, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const ShelterDetailHero = ({ shelter }) => {
  const navigate = useNavigate()

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mt-10 text-gray-600 hover:text-primary transition"
      >
        <ArrowLeft size={18} />
        Back to Shelters
      </button>

      <div className="bg-white rounded-[36px] shadow-xl p-10 mt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <img
            src={shelter.logo}
            alt={shelter.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-[#F7B39B]"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900">{shelter.name}</h1>

            <div className="flex flex-wrap gap-6 mt-4 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {shelter.location}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                {shelter.contactNumber}
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                Capacity: {shelter.animalCapacity}
              </div>
              <div className="flex items-center gap-2 text-primary font-semibold">
                <PawPrint size={16} />
                {shelter.activeVolunteerOpportunities} Active Opportunities
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-gray-600 leading-8">{shelter.description}</p>
      </div>
    </>
  )
}
