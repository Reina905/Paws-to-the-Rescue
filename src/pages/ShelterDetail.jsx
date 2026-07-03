import React from "react";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout/Layout";
import {
  MapPin,
  Phone,
  PawPrint,
  Users,
  ArrowLeft,
} from "lucide-react";
import { VolunteeringCard } from "../components/VolunteeringCard";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";

export const ShelterDetail = () => {
  const navigate = useNavigate();

  // 🔹 Mock data (luego lo reemplazas por API)
  const shelter = {
    id: 1,
    name: "Happy Paws Shelter",
    logo: "https://i.pravatar.cc/120?img=12",
    description:
      "A nonprofit shelter dedicated to rescuing abandoned and injured cats while helping them find loving homes. Our mission is to ensure every cat receives proper care, medical attention and a safe environment.",
    contactNumber: "+1 (555) 123-4567",
    location: "San José, Costa Rica",
    animalCapacity: 80,
    activeVolunteerOpportunities: 3,
  };

  // 🔹 Mock oportunidades (reutilizando tu componente existente)
  const opportunities = [
    {
      image: "/src/assets/VolunteerFeedingCats.PNG",
      category: "Care",
      shelterName: {
        name: shelter.name,
        logo: shelter.logo,
      },
      title: "Feeding and daily care for rescued cats",
      location: shelter.location,
      schedule: "Weekends 09:00 - 12:00",
      availableSlots: 3,
      takenSlots: 2,
      totalSlots: 5,
    },
    {
      image: "/src/assets/VolunteerFeedingCats.PNG",
      category: "Cleaning",
      shelterName: {
        name: shelter.name,
        logo: shelter.logo,
      },
      title: "Cleaning and maintenance of shelter areas",
      location: shelter.location,
      schedule: "Sundays 10:00 - 13:00",
      availableSlots: 4,
      takenSlots: 1,
      totalSlots: 6,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-tertiary-light min-h-screen">

        <Layout>

          {/* BACK */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mt-10 text-gray-600 hover:text-primary transition"
          >
            <ArrowLeft size={18} />
            Back to Shelters
          </button>

          {/* HERO */}
          <div className="bg-white rounded-[36px] shadow-xl p-10 mt-6">

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">

              <img
                src={shelter.logo}
                alt={shelter.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#F7B39B]"
              />

              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900">
                  {shelter.name}
                </h1>

                <div className="flex flex-wrap gap-6 mt-4 text-gray-600">

                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {shelter.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    {shelter.contactNumber}
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    Capacity: {shelter.animalCapacity}
                  </div>

                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <PawPrint size={16} />
                    {shelter.activeVolunteerOpportunities} Active Opportunities
                  </div>

                </div>
              </div>

            </div>

            <p className="mt-8 text-gray-600 leading-8">
              {shelter.description}
            </p>

          </div>

          {/* SECTION TITLE */}
          <div className="mt-16 mb-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Active Volunteer Opportunities
            </h2>

            <div className="w-24 h-1 bg-primary rounded-full mx-auto my-5"></div>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Join the shelter in its daily mission and help improve the lives
              of rescued cats through meaningful volunteer work.
            </p>
          </div>

          {/* OPPORTUNITIES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-24">

            {opportunities.map((op, index) => (
              <VolunteeringCard
                key={index}
                {...op}
              />
            ))}

          </div>

        </Layout>

      </main>
    </>
  );
};