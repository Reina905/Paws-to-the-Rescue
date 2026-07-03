import React from "react"
import { Layout } from "../components/Layout/Layout"
import { VolunteeringCard } from "../components/VolunteeringCard"
import { volunteeringData } from "../service/volunteeringData"
import { Navbar } from "../components/Navbar/Navbar"

export const Volunteering = () => {
  return (
    <>
    <Navbar />
    <section className="bg-tertiary-light py-24">
      <Layout>

        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900">
            Volunteering Opportunities
          </h1>

          <div className="w-24 h-1 bg-primary rounded-full mx-auto my-5"></div>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore all available volunteering opportunities and join a shelter near you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {volunteeringData.map((item) => (
            <VolunteeringCard key={item.id} {...item} />
          ))}
        </div>

      </Layout>
    </section>
    </>
  )
}