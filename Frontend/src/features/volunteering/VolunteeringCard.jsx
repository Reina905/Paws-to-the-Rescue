import { Link } from "react-router-dom"
import LocationIcon from "../../assets/CartoonResources/LocationIcon.png"
import DateIcon from "../../assets/CartoonResources/DateIcon.png"
import DurationIcon from "../../assets/CartoonResources/DurationIcon.png"
import { formatDate } from "../../utils/formatDate"

export const VolunteeringCard = ({ id, shelterName, name, image, category, totalSpaces, availableSpaces, date, duration, location }) => {
  const takenSpaces = totalSpaces - availableSpaces
  const filledPercentage = (takenSpaces / totalSpaces) * 100
  const isAlmostFull = filledPercentage >= 70

  return (
    <Link to={`/volunteering/${id}`} className="group block">
      <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Category badge — top left */}
          <span className="absolute top-3 left-3 bg-white text-primary text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
          {/* Almost full badge — top right */}
          {isAlmostFull && (
            <span className="absolute top-3 right-3 bg-primary-dark text-white text-xs font-semibold px-3 py-1 rounded-full">
              {availableSpaces} spots left
            </span>
          )}
        </div>

        <div className="p-5 flex flex-col gap-3">
          {/* Title */}
          <h3 className="font-bold text-base text-primary leading-snug line-clamp-2 group-hover:text-primary-dark transition-colors duration-200">
            {name}
          </h3>

          {/* Meta info */}
          <ul className="space-y-1.5 text-sm text-secondary-dark">
            <li className="flex items-center gap-2">
              <img src={DateIcon} alt="" aria-hidden="true" className="h-4 shrink-0" />
              {formatDate(date)}
            </li>
            <li className="flex items-center gap-2">
              <img src={DurationIcon} alt="" aria-hidden="true" className="h-4 shrink-0" />
              {duration}
            </li>
            <li className="flex items-center gap-2">
              <img src={LocationIcon} alt="" aria-hidden="true" className="h-4 shrink-0" />
              {location}
            </li>
            <li className="flex items-center gap-2">
              {shelterName?.logo && (
                <img
                  src={shelterName.logo}
                  alt={shelterName?.name || ''}
                  className="w-4 h-4 rounded-full object-cover shrink-0"
                />
              )}
              <span className="truncate">{shelterName?.name || 'Unknown Shelter'}</span>
            </li>
          </ul>

          {/* Divider */}
          <div className="border-t border-primary-light" />

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-secondary-dark font-medium">Availability</span>
              <span className={`font-semibold ${isAlmostFull ? "text-primary-dark" : "text-primary"}`}>
                {availableSpaces}/{totalSpaces} spots left
              </span>
            </div>
            <div className="w-full h-2 bg-secondary-light rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${isAlmostFull ? "bg-primary-dark" : "bg-primary"}`}
                style={{ width: `${filledPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
