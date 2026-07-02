import React from "react"
import { Layout } from "./Layout/Layout"
import { Trophy, Medal, Award } from "lucide-react"
import { motion } from "framer-motion"

export const VolunteerCard = ({ volunteer, featured = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className={`
        relative bg-white
        rounded-[36px]
        shadow-[0_15px_40px_rgba(0,0,0,.08)]
        flex flex-col items-center
        ${featured ? "w-[360px] h-[500px] pt-20" : "w-[300px] h-[390px] pt-16"}
      `}
    >
      {/* icono superior */}
      {featured && (
        <Trophy
          className="absolute top-6 text-[#8D4A34]"
          size={28}
        />
      )}

      {/* Avatar */}
      <div className="relative">
        <img
          src="https://i.pravatar.cc/200"
          alt={volunteer.name}
          className={`
            rounded-full object-cover
            border-4 border-[#F8B6A0]
            ${featured ? "w-32 h-32" : "w-24 h-24"}
          `}
        />

        {/* Número */}
        <div
          className="
            absolute
            -bottom-1
            -right-2
            w-14
            h-14
            rounded-full
            bg-[#9A5A43]
            text-white
            font-bold
            flex
            items-center
            justify-center
            border-4 border-white
          "
        >
          {volunteer.place}
        </div>
      </div>

      <h3 className="mt-8 text-4xl font-bold text-[#2A2422]">
        {volunteer.name}
      </h3>

      <p className="mt-2 tracking-[4px] font-semibold text-[#8D5A49] uppercase">
        {volunteer.hours} Hours
      </p>

      <div
        className="
          mt-auto
          mb-8
          px-8
          py-3
          rounded-full
          bg-[#FCE8E3]
          flex
          items-center
          gap-2
          text-[#8D5A49]
          font-semibold
        "
      >
        <Award size={18} />
        {featured ? "Volunteer of the Month" : "Shelter Hero"}
      </div>
    </motion.div>
  )
}