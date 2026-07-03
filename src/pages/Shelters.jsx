import React from "react";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout/Layout";
import { ShelterCard } from "../components/ShelterCard";
import { JoinCommunity } from "../components/JoinCommunity";
import { Navbar } from "../components/Navbar/Navbar";

export const Shelters = () => {
  const shelters = [
    {
      id: 1,
      name: "Happy Paws Shelter",
      logo: "https://i.pravatar.cc/100?img=12",
      description:
        "A nonprofit shelter dedicated to rescuing abandoned and injured cats while helping them find loving homes.",
      contactNumber: "+1 (555) 123-4567",
      location: "San José, Costa Rica",
      animalCapacity: 80,
      activeVolunteerOpportunities: 5,
    },
    {
      id: 2,
      name: "Cat Haven",
      logo: "https://i.pravatar.cc/100?img=24",
      description:
        "Providing medical care, temporary shelter and adoption opportunities for rescued cats.",
      contactNumber: "+1 (555) 876-5543",
      location: "Heredia, Costa Rica",
      animalCapacity: 120,
      activeVolunteerOpportunities: 8,
    },
    {
      id: 3,
      name: "Safe Whiskers",
      logo: "https://i.pravatar.cc/100?img=34",
      description:
        "Helping vulnerable cats recover through rehabilitation and community support.",
      contactNumber: "+1 (555) 765-1234",
      location: "Alajuela, Costa Rica",
      animalCapacity: 60,
      activeVolunteerOpportunities: 3,
    },
    {
      id: 4,
      name: "Hope for Cats",
      logo: "https://i.pravatar.cc/100?img=48",
      description:
        "A rescue organization focused on abandoned kittens and special-needs cats.",
      contactNumber: "+1 (555) 333-4545",
      location: "Cartago, Costa Rica",
      animalCapacity: 45,
      activeVolunteerOpportunities: 6,
    },
  ];

  return (
    <>
      <Navbar />

      <main>

        {/* Hero */}
        <section className="bg-tertiary-light py-24">
          <Layout>

            <div className="text-center max-w-3xl mx-auto">

              <h1 className="text-5xl font-bold text-gray-900">
                Our Partner Shelters
              </h1>

              <div className="w-24 h-1 bg-primary rounded-full mx-auto my-6" />

              <p className="text-lg text-gray-600 leading-8">
                Meet the shelters making a difference every day. Explore their
                mission, discover active volunteer opportunities and support the
                amazing work they do for rescued cats.
              </p>

            </div>

          </Layout>
        </section>

        {/* Shelters */}
        <section className="bg-white py-24">
          <Layout>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {shelters.map((shelter) => (
                <ShelterCard
                  key={shelter.id}
                  shelter={shelter}
                />
              ))}

            </div>

          </Layout>
        </section>

        <JoinCommunity />

      </main>
    </>
  );
};