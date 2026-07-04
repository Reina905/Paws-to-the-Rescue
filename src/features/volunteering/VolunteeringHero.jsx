import { ArrowRight } from "lucide-react"
import heroImage from "../../assets/VolunteerFeedingCats.PNG"
import { Header } from "../../layouts/Header"
import { PaddingLayout } from "../../layouts/PaddingLayout"

export const AboutHero = () => {
  return (
    <Header>
      {/* Background image */}
      <img
        src={heroImage}
        alt="Volunteers helping rescued cats"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35 -z-10" />

      {/* Hero content */}
      <PaddingLayout className="flex items-center flex-1">
        <div className="max-w-3xl text-white">
          <h1 className="mt-8 text-2xl md:text-6xl font-bold leading-tight">
            Every Cat Deserves
            <br />
            <span className="text-primary-light">A Second Chance.</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-200 leading-8 max-w-2xl">
            We connect shelters, volunteers and animal lovers to build a
            stronger community that gives rescued cats the care, safety and
            opportunities they deserve.
          </p>
        </div>
      </PaddingLayout>
    </Header>
  )
}
