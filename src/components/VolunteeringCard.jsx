import { Link } from "react-router-dom"

export const VolunteeringCard = ({ id, image, category, shelterName, title, location, schedule, availableSlots, takenSlots, totalSlots }) => {

  return (
    <Link to={`/volunteering/${id}`}>
      <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">

        <div className="relative h-56">
          <img src={image} className="w-full h-full object-cover" />

          <span className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        <div className="p-6 space-y-3">

          <div className="flex items-center gap-3">
            <img src={shelterName.logo} className="w-8 h-8 rounded-full" />
            <span className="text-sm text-gray-600">{shelterName.name}</span>
          </div>

          <h3 className="font-bold text-lg">{title}</h3>

          <p className="text-sm text-gray-500">{location}</p>
          <p className="text-sm text-gray-500">{schedule}</p>

        </div>

      </div>
    </Link>
  )
}