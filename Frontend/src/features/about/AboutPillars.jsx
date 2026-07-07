import { PaddingLayout } from "../../layouts/PaddingLayout"
import { SectionHeader } from "../../components/SectionHeader"
import missionImg from "../../assets/HeroStaticResources/VolunteerHelpingWithCleaning.PNG"
import visionImg from "../../assets/StaticResources/CatWithItsOwner.jpg"
import valuesImg from "../../assets/StaticResources/VolunteerBathingACat.png"

const PILLARS = [
  {
    title: "Mission",
    description:
      "Connect shelters with caring volunteers to improve the lives of rescued cats.",
    image: missionImg,
  },
  {
    title: "Vision",
    description:
      "Build a future where every cat has access to care, safety and a permanent home.",
    image: visionImg,
  },
  {
    title: "Values",
    description:
      "We believe lasting change happens when people work together with kindness and dedication.",
    image: valuesImg,
  },
]

export const AboutPillars = () => {
  return (
    <section className="bg-white py-20">
      <PaddingLayout>
        <SectionHeader
          title="Our Mission, Vision and Values"
          subtitle="Everything we do is guided by a clear purpose — giving rescued cats a second chance and building a community that cares."
          className="mb-10"
        />

        <div className="flex flex-col md:flex-row gap-5">
          {PILLARS.map(({ title, description, image }) => (
            <div
              key={title}
              className="relative h-96 md:h-112 w-full rounded-3xl overflow-hidden shadow-lg group"
            >
              <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl text-center font-bold leading-snug text-secondary">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-center font-semibold text-white leading-7">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PaddingLayout>
    </section>
  )
}
