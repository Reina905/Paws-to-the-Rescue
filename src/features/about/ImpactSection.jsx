import React from "react";
import { PaddingLayout } from "../../layouts/PaddingLayout";
import {
  Users,
  House,
  Cat,
  CalendarDays,
} from "lucide-react";

export const ImpactSection = () => {
  const stats = [
    {
      icon: <Users size={34} />,
      value: "500+",
      label: "Active Volunteers",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: <House size={34} />,
      value: "50+",
      label: "Partner Shelters",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: <Cat size={34} />,
      value: "2,000+",
      label: "Cats Helped",
      color: "bg-orange-50 text-orange-500",
    },
    {
      icon: <CalendarDays size={34} />,
      value: "150+",
      label: "Community Events",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section className="bg-tertiary-light py-24">
      <PaddingLayout>

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold uppercase tracking-[3px]">
            Our Impact
          </span>

          <h2 className="text-5xl font-bold text-gray-900 mt-4">
            Together We Make a Difference
          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-8">
            Every volunteer, shelter and rescued cat represents another step
            toward creating a safer and more compassionate community for
            animals in need.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">

          {/* Left */}
          <div className="space-y-6">

            {stats.slice(0, 2).map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-3xl p-8 shadow-md flex items-center gap-5"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stat.color}`}
                >
                  {stat.icon}
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-gray-900">
                    {stat.value}
                  </h3>

                  <p className="text-gray-500">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}

          </div>

          {/* Center */}
          <div className="bg-primary text-white rounded-[36px] p-10 shadow-xl text-center">

            <h3 className="text-3xl font-bold">
              Building Hope,
              <br />
              One Cat at a Time
            </h3>

            <p className="mt-8 leading-8 text-white/90">
              Our community continues to grow thanks to the incredible
              dedication of volunteers, shelters and supporters who believe
              every rescued cat deserves a second chance.
            </p>

            <div className="mt-10 text-6xl">
              🐾
            </div>

          </div>

          {/* Right */}
          <div className="space-y-6">

            {stats.slice(2).map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-3xl p-8 shadow-md flex items-center gap-5"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stat.color}`}
                >
                  {stat.icon}
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-gray-900">
                    {stat.value}
                  </h3>

                  <p className="text-gray-500">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>

      </PaddingLayout>
    </section>
  );
};