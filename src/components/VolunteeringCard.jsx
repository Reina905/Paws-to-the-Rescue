import React from "react"

export const VolunteeringCard = ({
  image,
  category,
  shelterName,
  title,
  location,
  schedule,
  availableSlots,
  takenSlots,
  totalSlots,
}) => {
  const progress = (takenSlots / totalSlots) * 100

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

      {/* IMAGE */}
      <div className="relative h-56">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* CATEGORY */}
        <span className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full shadow">
          {category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-4">
        {/* TITLE */}
        <h3 className="text-lg font-bold text-gray-900 leading-snug">
          {title}
        </h3>

        {/* SHELTER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={shelterName.logo}
              alt="shelter"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-gray-600 font-medium text-sm">
              {shelterName.name}
            </span>
          </div>
        </div>

        {/* INFO ROW */}
        <div className="flex flex-col gap-2 text-sm text-gray-500">

          <div className="flex items-center gap-2">
            <span></span>
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2">
            <span></span>
            <span>{schedule}</span>
          </div>

        </div>

        {/* AVAILABILITY */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Cupos disponibles</span>
            <span className="font-semibold text-primary">
              {availableSlots}/{totalSlots}
            </span>
          </div>

          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* BUTTON */}
        <button className="w-full mt-2 bg-primary text-white py-3 rounded-2xl hover:bg-primary-dark transition">
          Ver oportunidad
        </button>

      </div>
    </div>
  )
}