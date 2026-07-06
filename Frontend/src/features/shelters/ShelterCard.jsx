import { Link } from "react-router-dom"
import LocationIcon from "../../assets/CartoonResources/LocationIcon.png"

export const ShelterCard = ({ shelter }) => {
  return (
    <Link to={`/shelters/${shelter.id}`} className="group block">
      <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-secondary-light">
          <img
            src={shelter.logo}
            alt={shelter.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5 flex flex-col gap-3">
          {/* Name */}
          <h3 className="font-bold text-base text-primary leading-snug line-clamp-2 group-hover:text-primary-dark transition-colors duration-200">
            {shelter.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-secondary-dark leading-6 line-clamp-2">
            {shelter.description}
          </p>

          {/* Meta info */}
          <ul className="space-y-1.5 text-sm text-secondary-dark">
            <li className="flex items-center gap-2">
              <img src={LocationIcon} alt="" aria-hidden="true" className="h-4 shrink-0" />
              {shelter.location}
            </li>
          </ul>

          {/* Divider */}
          <div className="border-t border-primary-light" />

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={(e) => e.preventDefault()}
              className="flex-1 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors duration-200"
            >
              View Shelter
            </button>
            <Link
              to={`/shelters/${shelter.id}#opportunities`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 py-2.5 rounded-full border border-primary-light text-primary text-sm font-semibold hover:bg-secondary-light transition-colors duration-200 text-center"
            >
              Opportunities
            </Link>
          </div>
        </div>
      </div>
    </Link>
  )
}
