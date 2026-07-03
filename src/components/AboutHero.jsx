import React from "react";
import { Layout } from "./Layout/Layout";
import { ArrowRight } from "lucide-react";
import heroImage from "../assets/VolunteerFeedingCats.PNG";

export const AboutHero = () => {
  return (
    <section className="relative h-[70vh] min-h-[600px] flex items-center">
      {/* Background */}
      <img
        src={heroImage}
        alt="Volunteers helping rescued cats"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <Layout>
        <div className="relative z-10 max-w-3xl text-white">
          <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-full text-sm font-medium">
            🐾 About Paws to the Rescue
          </span>

          <h1 className="mt-8 text-5xl md:text-6xl font-bold leading-tight">
            Every Cat Deserves
            <br />
            <span className="text-primary-light">A Second Chance.</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-200 leading-8 max-w-2xl">
            We connect shelters, volunteers and animal lovers to build a
            stronger community that gives rescued cats the care, safety and
            opportunities they deserve.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <button className="bg-primary hover:bg-primary-dark transition px-8 py-4 rounded-full font-semibold flex items-center gap-2">
              Become a Volunteer
              <ArrowRight size={18} />
            </button>

            <button className="border border-white hover:bg-white hover:text-gray-900 transition px-8 py-4 rounded-full font-semibold">
              Learn Our Story
            </button>
          </div>
        </div>
      </Layout>
    </section>
  );
};