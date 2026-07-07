import { MapPin, Phone, Users, PawPrint } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { PaddingLayout } from "../../layouts/PaddingLayout"
import DefaultShelterImg from "../../assets/StaticResources/GenericShelter.PNG"

export const ShelterDetailHero = ({ shelter }) => {
  const navigate = useNavigate()

  return (
    <section className="bg-tertiary-light py-10">
      <PaddingLayout>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 font-semibold py-2 px-3 rounded-xl text-primary hover:bg-secondary-light transition-all duration-300 ease-in-out hover:-translate-y-0.5 text-sm mb-6"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow-md p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <img
              src={shelter.logo || DefaultShelterImg}
              alt={shelter.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-secondary shadow-md shrink-0"
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-primary">{shelter.name}</h1>

              <div className="flex flex-wrap gap-5 mt-4 text-sm text-secondary-dark">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-tertiary shrink-0" />
                  {shelter.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone size={14} className="text-tertiary shrink-0" />
                  {shelter.contactNumber}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-tertiary shrink-0" />
                  Capacity: {shelter.animalCapacity}
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-primary">
                  <PawPrint size={14} className="shrink-0" />
                  {shelter.opportunities?.length || shelter.activeVolunteerOpportunities || 0} Active Opportunities
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-light mt-8 pt-6">
            <p className="text-secondary-dark leading-8 text-sm">{shelter.description}</p>
          </div>
        </div>
      </PaddingLayout>
    </section>
  )
}
