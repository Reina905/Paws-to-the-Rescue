import React from "react";
import { PaddingLayout } from "../../layouts/PaddingLayout"

import gallery1 from "../../assets/VolunteerFeedingCats.PNG";
import gallery2 from "../../assets/VolunteerFeedingCats.PNG";
import gallery3 from "../../assets/VolunteerFeedingCats.PNG";
import gallery4 from "../../assets/VolunteerFeedingCats.PNG";
import gallery5 from "../../assets/VolunteerFeedingCats.PNG";
import gallery6 from "../../assets/VolunteerFeedingCats.PNG";
import gallery7 from "../../assets/VolunteerFeedingCats.PNG";
import gallery8 from "../../assets/VolunteerFeedingCats.PNG";

export const CommunityGallery = () => {
  const images = [
    {
      image: gallery1,
      title: "Volunteer feeding rescued cats",
      height: "h-80",
    },
    {
      image: gallery2,
      title: "Shelter teamwork",
      height: "h-64",
    },
    {
      image: gallery3,
      title: "Adoption day",
      height: "h-96",
    },
    {
      image: gallery4,
      title: "Happy rescue",
      height: "h-72",
    },
    {
      image: gallery5,
      title: "Community event",
      height: "h-80",
    },
    {
      image: gallery6,
      title: "Volunteer caring for kittens",
      height: "h-64",
    },
    {
      image: gallery7,
      title: "Shelter cats",
      height: "h-72",
    },
    {
      image: gallery8,
      title: "Forever home",
      height: "h-96",
    },
  ];

  return (
    <section className="bg-tertiary-light py-24">
      <PaddingLayout>
        {/* Header */}
        <div className="text-center mb-16">
          <span className="uppercase tracking-[3px] text-primary font-semibold">
            Community Gallery
          </span>

          <h2 className="mt-4 text-5xl font-bold text-gray-900">
            Moments That Define Our Mission
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-gray-600 leading-8">
            Behind every rescue is a story of compassion, teamwork and hope.
            These moments capture the incredible people and cats that make our
            community so special.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {images.map((item, index) => (
            <div
              key={index}
              className={`
                relative
                overflow-hidden
                rounded-[28px]
                shadow-lg
                group
                ${item.height}
              `}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition duration-500 flex items-end">
                <div className="opacity-0 group-hover:opacity-100 transition duration-500 p-6 text-white">
                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Quote */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <p className="text-2xl italic text-gray-700 leading-10">
            "Every rescued cat reminds us that kindness, no matter how small,
            has the power to change a life forever."
          </p>
        </div>

      </PaddingLayout>
    </section>
  );
};