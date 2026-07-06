import { PaddingLayout } from "../../layouts/PaddingLayout";
import { SectionHeader } from "../../components/SectionHeader";
import { ArrowRight } from "lucide-react";

import cat1 from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG";
import cat2 from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG";
import cat3 from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG";

const STORIES = [
  {
    id: 1,
    name: "Milo",
    age: "2 years old",
    image: cat1,
    story: "Milo was rescued after spending months surviving on the streets. Thanks to the dedication of our volunteers, he recovered, learned to trust people again, and found a loving forever home.",
  },
  {
    id: 2,
    name: "Luna",
    age: "1 year old",
    image: cat2,
    story: "Luna arrived at a shelter frightened and malnourished. With medical care and patience from volunteers, she became a playful companion and was adopted by a wonderful family.",
  },
  {
    id: 3,
    name: "Oliver",
    age: "3 years old",
    image: cat3,
    story: "Oliver's journey began with an emergency rescue. Today he enjoys a safe home, daily affection and a second chance at life thanks to our community.",
  },
];

export const SuccessStories = () => {
  return (
    <section className="bg-white py-20">
      <PaddingLayout>
        <SectionHeader
          label="Happy Tails"
          title="Stories That Inspire Us"
          subtitle="Every rescued cat has a unique journey. These stories remind us why every volunteer, every shelter and every act of kindness matters."
          className="mb-16"
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={story.image}
                alt={story.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-7">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-primary">{story.name}</h3>
                  <span className="bg-secondary-light px-3 py-1 rounded-full text-sm font-semibold text-primary">
                    {story.age}
                  </span>
                </div>

                <p className="mt-4 text-secondary-dark leading-7 text-sm">
                  {story.story}
                </p>

                <button className="mt-6 flex items-center gap-2 font-semibold text-sm text-primary hover:text-primary-dark hover:gap-3 transition-all">
                  Read Full Story
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </PaddingLayout>
    </section>
  );
};
