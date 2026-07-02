import React from "react"
import { useParams } from "react-router-dom"
import { volunteeringData } from "../service/volunteeringData"
import { Layout } from "../components/Layout/Layout"

export const VolunteeringDetails = () => {
  const { id } = useParams()

  const opportunity = volunteeringData.find((item) => item.id === id)

  if (!opportunity) {
    return <div className="p-10">Opportunity not found</div>
  }

  return (
    <section className="bg-tertiary-light py-24">
      <Layout>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <img
            src={opportunity.image}
            className="w-full h-96 object-cover"
          />

          <div className="p-10 space-y-6">

            <span className="bg-primary text-white px-4 py-2 rounded-full text-sm">
              {opportunity.category}
            </span>

            <h1 className="text-4xl font-bold">
              {opportunity.title}
            </h1>

            <p className="text-gray-600 leading-8">
              {opportunity.description}
            </p>

            <div className="grid grid-cols-2 gap-6 text-gray-700">

              <p><strong>Shelter:</strong> {opportunity.shelterName}</p>
              <p><strong>Location:</strong> {opportunity.location}</p>
              <p><strong>Schedule:</strong> {opportunity.schedule}</p>
              <p><strong>Slots:</strong> {opportunity.availableSlots}/{opportunity.totalSlots}</p>

            </div>

            <button className="bg-primary text-white px-6 py-3 rounded-2xl hover:bg-primary-dark transition">
              Apply Now
            </button>

          </div>

        </div>

      </Layout>
    </section>
  )
}