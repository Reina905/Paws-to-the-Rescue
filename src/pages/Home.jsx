import React from 'react'
import { Header } from '../components/Header'
import { Layout } from '../components/Layout/Layout'
import VolunteerFeedingCats from '/src/assets/VolunteerFeedingCats.PNG'
import { PawBackground } from '../components/PawBackground'
import { VolunteeringCard } from "../components/VolunteeringCard"
import catImage from "/src/assets/VolunteerFeedingCats.PNG"
import { VolunteerCard } from '../components/VolunteerCard'
import { Footer } from "../components/Footer"
import { JoinCommunity } from '../components/JoinCommunity'

export const Home = () => {
  const volunteers = [
    {
      place: 1,
      name: "Sarah Jenkins",
      hours: 245,
    },
    {
      place: 2,
      name: "Michael Chen",
      hours: 185,
    },
    {
      place: 3,
      name: "Elena Rodriguez",
      hours: 142,
    },
  ]

  return (
    <>
      <Header />

      <main className="relative overflow-hidden isolate">

        {/* about us*/}
        <section className="bg-tertiary-light py-20">
          <Layout>
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-14">
              <div className="flex flex-col md:flex-row items-center gap-12">

                {/* Image */}
                <div className="relative md:w-2/5">
                  <img
                    src={VolunteerFeedingCats}
                    alt="Volunteer feeding rescued cats"
                    className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                  />

                  <div className="absolute -bottom-5 -right-5 bg-primary text-white px-5 py-3 rounded-2xl shadow-lg">
                    Founded by Cat Lovers
                  </div>
                </div>

                {/* Text */}
                <div className="md:w-3/5">
                  <h2 className="text-4xl font-bold text-gray-900">
                    About Us
                  </h2>

                  <div className="w-24 h-1 bg-primary rounded-full my-5"></div>

                  <p className="text-gray-600 leading-8">
                    Paws to the Rescue started with a small group of cat lovers who
                    saw local shelters overwhelmed. Today, we bridge the gap between
                    dedicated shelters and passionate volunteers like you. We provide
                    the tools, the network, and the community to ensure no cat is left behind.
                  </p>

                  <button className="mt-8 px-7 py-3 bg-primary text-white rounded-full shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all duration-300">
                    More Details
                  </button>
                </div>

              </div>
            </div>
          </Layout>
        </section>

        {/*Our impact */}
        <section className="bg-white py-24">
          <Layout>

            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900">
                Our Impact
              </h2>

              <div className="w-24 h-1 bg-primary rounded-full mx-auto my-5"></div>

              <p className="text-gray-600 max-w-2xl mx-auto leading-8">
                Every volunteer, shelter, and rescue contributes to building a safer
                future for cats in our community.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

              <div className="bg-tertiary-light rounded-3xl p-8 text-center shadow-md">
                <h3 className="text-5xl font-bold text-primary">500+</h3>
                <p className="mt-3 text-gray-600">Volunteers</p>
              </div>

              <div className="bg-tertiary-light rounded-3xl p-8 text-center shadow-md">
                <h3 className="text-5xl font-bold text-primary">50+</h3>
                <p className="mt-3 text-gray-600">Partner Shelters</p>
              </div>

              <div className="bg-tertiary-light rounded-3xl p-8 text-center shadow-md">
                <h3 className="text-5xl font-bold text-primary">2,000+</h3>
                <p className="mt-3 text-gray-600">Cats Helped</p>
              </div>

              <div className="bg-tertiary-light rounded-3xl p-8 text-center shadow-md">
                <h3 className="text-5xl font-bold text-primary">150+</h3>
                <p className="mt-3 text-gray-600">Events</p>
              </div>

            </div>

          </Layout>
        </section>

        <section className="bg-tertiary-light py-24 px-10">
          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900">
              Volunteer Opportunities
            </h2>

            <div className="w-24 h-1 bg-primary rounded-full mx-auto my-5"></div>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Find active opportunities to help shelters and make a real impact in the lives of rescued cats.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <VolunteeringCard
              image={catImage}
              category="Limpieza"
              shelterName={{
                name: "Casa Felina BCN",
                logo: "https://i.pravatar.cc/40"
              }}
              title="Limpieza y mantenimiento de instalaciones"
              location="Barcelona"
              schedule="Domingos 09:00 - 12:00"
              availableSlots={2}
              takenSlots={2}
              totalSlots={8}
            />

            <VolunteeringCard
              image={catImage}
              category="Limpieza"
              shelterName={{
                name: "Casa Felina BCN",
                logo: "https://i.pravatar.cc/40"
              }}
              title="Limpieza y mantenimiento de instalaciones"
              location="Barcelona"
              schedule="Domingos 09:00 - 12:00"
              availableSlots={2}
              takenSlots={2}
              totalSlots={8}
            />

            <VolunteeringCard
              image={catImage}
              category="Limpieza"
              shelterName={{
                name: "Casa Felina BCN",
                logo: "https://i.pravatar.cc/40"
              }}
              title="Limpieza y mantenimiento de instalaciones"
              location="Barcelona"
              schedule="Domingos 09:00 - 12:00"
              availableSlots={2}
              takenSlots={2}
              totalSlots={8}
            />

            <VolunteeringCard
              image={catImage}
              category="Limpieza"
              shelterName={{
                name: "Casa Felina BCN",
                logo: "https://i.pravatar.cc/40"
              }}
              title="Limpieza y mantenimiento de instalaciones"
              location="Barcelona"
              schedule="Domingos 09:00 - 12:00"
              availableSlots={2}
              takenSlots={2}
              totalSlots={8}
            />
          </div>
        </section>

        <section className="bg-[#FCF7F5] py-24">
          <Layout>

            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold">
                Volunteers of the Month
              </h2>
            </div>

            <div className="flex justify-center items-end gap-10">
              <VolunteerCard volunteer={volunteers[1]} />
              <VolunteerCard volunteer={volunteers[0]} featured />
              <VolunteerCard volunteer={volunteers[2]} />
            </div>

            <JoinCommunity />
          </Layout>
        </section>
      </main>

      <Footer/>
    </>
  )
}