import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  PawPrint,
  Users,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ShelterCard = ({ shelter }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className="
        relative bg-white
        rounded-[32px]
        shadow-[0_15px_40px_rgba(0,0,0,.08)]
        p-7
        flex flex-col
        gap-5
        hover:shadow-xl
        transition
      "
    >
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img
          src={shelter.logo}
          alt={shelter.name}
          className="w-16 h-16 rounded-full object-cover border-4 border-[#F7B39B]"
        />

        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {shelter.name}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={14} />
            {shelter.location}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-6 line-clamp-3">
        {shelter.description}
      </p>

      {/* Info */}
      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Phone size={14} />
          {shelter.contactNumber}
        </div>

        <div className="flex items-center gap-2">
          <Users size={14} />
          Capacity: {shelter.animalCapacity} animals
        </div>

        <div className="flex items-center gap-2 text-primary font-semibold">
          <PawPrint size={14} />
          {shelter.activeVolunteerOpportunities} Active Opportunities
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-auto pt-4">
        <button
          onClick={() => navigate(`/shelters/${shelter.id}`)}
          className="
            flex-1
            py-3
            rounded-full
            bg-primary
            text-white
            font-semibold
            hover:bg-primary-dark
            transition
          "
        >
          View Shelter
        </button>

        <button
          onClick={() =>
            navigate(`/shelters/${shelter.id}#opportunities`)
          }
          className="
            flex-1
            py-3
            rounded-full
            border
            border-gray-300
            text-gray-700
            font-semibold
            hover:bg-gray-100
            transition
          "
        >
          Opportunities
        </button>
      </div>
    </motion.div>
  );
};