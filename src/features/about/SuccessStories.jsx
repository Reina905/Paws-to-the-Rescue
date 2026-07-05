import React from "react";
import { PaddingLayout } from "../../layouts/PaddingLayout";
import { ArrowRight } from "lucide-react";

import cat1 from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG";
import cat2 from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG";
import cat3 from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG";

export const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Milo",
      age: "2 years old",
      image: cat1,
      story:
        "Milo was rescued after spending months surviving on the streets. Thanks to the dedication of our volunteers, he recovered, learned to trust people again, and found a loving forever home.",
    },
    {
      id: 2,
      name: "Luna",
      age: "1 year old",
      image: cat2,
      story:
        "Luna arrived at a shelter frightened and malnourished. With medical care and patience from volunteers, she became a playful companion and was adopted by a wonderful family.",
    },
    {
      id: 3,
      name: "Oliver",
      age: "3 years old",
      image: cat3,
      story:
        "Oliver's journey began with an emergency rescue. Today he enjoys a safe home, daily affection and a second chance at life thanks to our community.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <PaddingLayout>

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary uppercase tracking-[3px] font-semibold">
            Happy Tails
          </span>

          <h2 className="mt-4 text-5xl font-bold text-gray-900">
            Stories That Inspire Us
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-gray-600 leading-8">
            Every rescued cat has a unique journey. These stories remind us why
            every volunteer, every shelter and every act of kindness matters.
          </p>
        </div>

        {/* Stories */}
        <div className="grid lg:grid-cols-3 gap-8">

          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <img
                src={story.image}
                alt={story.name}
                className="h-72 w-full object-cover"
              />

              {/* Content */}
              <div className="p-8">

                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {story.name}
                  </h3>

                  <span className="bg-tertiary-light px-4 py-2 rounded-full text-sm font-medium text-primary">
                    {story.age}
                  </span>
                </div>

                <p className="mt-6 text-gray-600 leading-7">
                  {story.story}
                </p>

                <button className="mt-8 flex items-center gap-2 font-semibold text-primary hover:gap-4 transition-all">
                  Read Full Story
                  <ArrowRight size={18} />
                </button>

              </div>
            </div>
          ))}

        </div>

      </PaddingLayout>
    </section>
  );
};