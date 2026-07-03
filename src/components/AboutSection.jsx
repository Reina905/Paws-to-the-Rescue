import React from "react";
import { Layout } from "./Layout/Layout";
import {
  HeartHandshake,
  Target,
  Users,
} from "lucide-react";

import aboutImage from "../assets/VolunteerFeedingCats.PNG";

export const AboutSection = () => {
  return (
    <section className="bg-white py-24">
      <Layout>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="relative">
            <img
              src={aboutImage}
              alt="Volunteers caring for rescued cats"
              className="rounded-[32px] shadow-2xl w-full h-[600px] object-cover"
            />

            <div className="absolute -bottom-8 -right-8 bg-primary text-white rounded-3xl shadow-xl p-6 max-w-[220px]">
              <h3 className="text-3xl font-bold">2019</h3>

              <p className="mt-2 text-white/90">
                Year our community began helping rescued cats.
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-primary font-semibold uppercase tracking-[3px]">
              Who We Are
            </span>

            <h2 className="mt-4 text-5xl font-bold text-gray-900 leading-tight">
              A Community Built Around Compassion
            </h2>

            <p className="mt-8 text-gray-600 leading-8">
              Paws to the Rescue was created by a group of passionate animal
              lovers who believed that every rescued cat deserves safety,
              medical care and a chance to find a loving home.
            </p>

            <p className="mt-6 text-gray-600 leading-8">
              Today, we work hand in hand with shelters, volunteers and donors
              to organize rescue efforts, coordinate volunteer opportunities,
              and strengthen the local animal welfare community.
            </p>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-5 mt-12">

              <div className="bg-tertiary-light rounded-3xl p-6 shadow-md">
                <HeartHandshake
                  className="text-primary mb-4"
                  size={34}
                />

                <h3 className="font-bold text-lg">
                  Mission
                </h3>

                <p className="mt-3 text-sm text-gray-600 leading-6">
                  Connect shelters with caring volunteers to improve the lives
                  of rescued cats.
                </p>
              </div>

              <div className="bg-tertiary-light rounded-3xl p-6 shadow-md">
                <Target
                  className="text-primary mb-4"
                  size={34}
                />

                <h3 className="font-bold text-lg">
                  Vision
                </h3>

                <p className="mt-3 text-sm text-gray-600 leading-6">
                  Build a future where every cat has access to care, safety and
                  a permanent home.
                </p>
              </div>

              <div className="bg-tertiary-light rounded-3xl p-6 shadow-md">
                <Users
                  className="text-primary mb-4"
                  size={34}
                />

                <h3 className="font-bold text-lg">
                  Community
                </h3>

                <p className="mt-3 text-sm text-gray-600 leading-6">
                  We believe lasting change happens when people work together
                  with kindness and dedication.
                </p>
              </div>

            </div>

          </div>

        </div>
      </Layout>
    </section>
  );
};