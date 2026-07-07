import { useState } from "react";
import { PaddingLayout } from "../../layouts/PaddingLayout";
import { SectionHeader } from "../../components/SectionHeader";

import gallery1 from "../../assets/StaticResources/VolunterFeedingCats.PNG";
import gallery2 from "../../assets/HeroStaticResources/AboutUsHeroBackground.PNG";
import gallery3 from "../../assets/StaticResources/AdoptedCat.png";
import gallery4 from "../../assets/HeroStaticResources/HappyPawsShelter.PNG";
import CatTakenToTheVeterinary from "../../assets/StaticResources/VeterinaryCare.mp4";
import kittensClip from "../../assets/StaticResources/KittiesDrinkingMilk.mp4";

const IMAGES = [
  { image: gallery1, title: "Volunteer feeding cats at Cat Heaven shelter" },
  { image: gallery2, title: "Volunteers working as a team at the Happy Whiskers shelter" },
  { image: gallery3, title: "100 cats were adopted in a year!" },
  { image: "", title: "Volunteers rescued Milo and took him to the veterinarian", video: CatTakenToTheVeterinary },
  { image: "", title: "Rescued Kittens drinking milk", video: kittensClip },
  { image: gallery4, title: "Happy Paws shelter was created by volunteers and opened its doors recently!" },
];

const VideoBadge = () => (
  <span className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md">
    <svg viewBox="0 0 20 20" fill="currentColor" className="ml-0.5 h-3.5 w-3.5 text-primary">
      <path d="M6.3 4.6a1 1 0 0 1 1.51-.86l8.4 5.4a1 1 0 0 1 0 1.72l-8.4 5.4a1 1 0 0 1-1.51-.86V4.6Z" />
    </svg>
  </span>
);

const TitleOverlay = ({ title }) => (
  <div className="pointer-events-none absolute inset-x-0 top-0 bg-linear-to-b from-black/60 to-transparent p-6 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    <h3 className="text-lg font-semibold text-white">{title}</h3>
  </div>
);

const ChevronButton = ({ direction, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === "prev" ? "Previous" : "Next"}
    className={`absolute top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-all duration-200 ${
      direction === "prev" ? "left-4" : "right-4"
    } ${disabled ? "opacity-0" : "opacity-100 hover:bg-white"}`}
  >
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-primary">
      {direction === "prev" ? (
        <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
      ) : (
        <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
      )}
    </svg>
  </button>
);

export const CommunityGallery = () => {
  const [index, setIndex] = useState(0);

  const canPrev = index > 0;
  const canNext = index < IMAGES.length - 1;

  return (
    <section className="bg-white py-20">
      <PaddingLayout>
        <SectionHeader
          title="Moments That Define Our Mission"
          subtitle="Behind every rescue is a story of compassion, teamwork and hope. These moments capture the incredible people and cats that make our community so special."
          className="mb-14 text-center"
        />

        {/* Slide */}
        <div className="group relative h-80 w-full overflow-hidden rounded-3xl shadow-xl sm:h-105 md:h-140">
          {IMAGES.map(({ image, title, video }, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {i === index && video ? (
                <div className="relative h-full w-full">
                  <video
                    key={video}
                    src={video}
                    poster={image || undefined}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    controls
                    playsInline
                  />
                  <TitleOverlay title={title} />
                </div>
              ) : (
                <div className="relative h-full w-full">
                  {image ? (
                    <img src={image} alt={title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-primary/10" />
                  )}
                  {video && <VideoBadge />}
                  <TitleOverlay title={title} />
                </div>
              )}
            </div>
          ))}

          <ChevronButton direction="prev" onClick={() => setIndex((i) => Math.max(i - 1, 0))} disabled={!canPrev} />
          <ChevronButton direction="next" onClick={() => setIndex((i) => Math.min(i + 1, IMAGES.length - 1))} disabled={!canNext} />

          {/* Dot indicators, overlaid on the image */}
          <div className="absolute inset-x-0 bottom-5 z-40 flex justify-center gap-2">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`block rounded-full shadow-sm transition-all duration-300 ${
                  i === index ? "h-2 w-6 bg-white" : "h-2 w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </PaddingLayout>
    </section>
  );
};