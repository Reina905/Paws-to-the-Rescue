import { useState } from "react";
import { PaddingLayout } from "../../layouts/PaddingLayout";
import { SectionHeader } from "../../components/SectionHeader";

import gallery1 from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG";
import gallery2 from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG";
import gallery3 from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG";
import gallery4 from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG";
import gallery5 from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG";
import gallery6 from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG";
import gallery7 from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG";
import gallery8 from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG";

const IMAGES = [
  { image: gallery1, title: "Volunteer feeding rescued cats" },
  { image: gallery2, title: "Shelter teamwork" },
  { image: gallery3, title: "Adoption day" },
  { image: gallery4, title: "Happy rescue" },
  { image: gallery5, title: "Community event" },
  { image: gallery6, title: "Volunteer caring for kittens" },
  { image: gallery7, title: "Shelter cats" },
  { image: gallery8, title: "Forever home" },
];

// How many cards are visible depends on screen size.
// We drive this with a simple JS state + CSS (1 / 2 / 3 visible).
const SLIDES_PER_VIEW = {
  sm: 1,
  md: 2,
  lg: 3,
};

function useCarousel(total, visible) {
  const [index, setIndex] = useState(0);
  const maxIndex = total - visible;

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));

  return { index, prev, next, canPrev: index > 0, canNext: index < maxIndex };
}

function ArrowButton({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className={`
        w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-200
        ${
          disabled
            ? "border-gray-300 text-gray-300 cursor-not-allowed"
            : "border-secondary text-secondary hover:bg-secondary hover:text-white"
        }
      `}
    >
      {direction === "prev" ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}

export const CommunityGallery = () => {
  // Use lg (3 visible) for the JS-driven carousel logic.
  // For smaller screens we rely on CSS (overflow-hidden + translate).
  // A single hook with 3 visible covers all — smaller screens just show fewer naturally.
  const visible = SLIDES_PER_VIEW.lg;
  const { index, prev, next, canPrev, canNext } = useCarousel(IMAGES.length, visible);

  const translatePercent = -(index * (100 / visible));

  return (
    <section className="bg-tertiary-light py-20">
      <PaddingLayout>
        {/* Header + arrows */}
        <div className="flex items-end justify-between mb-16 gap-6">
          <SectionHeader
            label="Community Gallery"
            title="Moments That Define Our Mission"
            subtitle="Behind every rescue is a story of compassion, teamwork and hope. These moments capture the incredible people and cats that make our community so special."
            className="max-w-2xl"
          />

          <div className="flex gap-3 shrink-0 pb-1">
            <ArrowButton direction="prev" onClick={prev} disabled={!canPrev} />
            <ArrowButton direction="next" onClick={next} disabled={!canNext} />
          </div>
        </div>

        {/* Carousel track */}
        <div className="overflow-hidden rounded-3xl">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-5"
            style={{ transform: `translateX(calc(${translatePercent}% - ${index * (20 / visible)}px))` }}
          >
            {IMAGES.map(({ image, title }, i) => (
              <div
                key={i}
                // flex-shrink-0 + width: each card takes 1/visible of the container
                className="relative shrink-0 h-96 rounded-3xl overflow-hidden shadow-lg group"
                style={{ width: `calc(${100 / visible}% - ${((visible - 1) * 20) / visible}px)` }}
              >
                <img
                  src={image}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Always-visible overlay */}
                <div className="absolute inset-0 bg-black/35" />
                {/* Title revealed on hover */}
                <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
                  <h3 className="text-xl font-bold leading-snug text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {IMAGES.map((_, i) => (
            <span
              key={i}
              className={`block rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 h-2 bg-secondary"
                  : "w-2 h-2 bg-secondary/30"
              }`}
            />
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-xl italic text-secondary-dark leading-9">
            "Every rescued cat reminds us that kindness, no matter how small,
            has the power to change a life forever."
          </p>
        </div>
      </PaddingLayout>
    </section>
  );
};
