import { PaddingLayout } from "../../layouts/PaddingLayout"
import { SectionHeader } from "../../components/SectionHeader"
import { SecondaryNavLink } from "../../layouts/Navbar/SecondaryNavLink"
import VolunteerTakingCareOfACat from "../../assets/StaticResources/VolunteerTakingCareOfACat.PNG"
import HappyPawsShelter from "../../assets/HeroStaticResources/HappyPawsShelter.PNG"
import { ArrowRight } from "lucide-react"

const STATS = [
  { value: "500+", label: "Volunteers" },
  { value: "120+", label: "Cats Rescued" },
  { value: "30+", label: "Shelters" },
]

export const JoinCommunity = () => {
  return (
    <section className="bg-white py-20 pt-10">
      <PaddingLayout>
        <SectionHeader
          title="Ready to Make a Difference?"
          subtitle="Whether you want to volunteer your time or register your shelter, we'd love to welcome you to our growing community."
          className="mb-16"
        />

        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative h-96 md:h-112 w-full rounded-3xl overflow-hidden shadow-lg group">
            <img
              src={VolunteerTakingCareOfACat}
              alt="Volunteer helping with cleaning"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
              <h3 className="text-2xl text-center font-bold leading-snug text-secondary">
                Become a Volunteer
              </h3>
              <p className="mt-2 text-sm text-white text-center font-semibold">
                Help rescued cats through feeding, cleaning, transportation, fostering, fundraising and many other meaningful activities.
              </p>
              <div className=" flex mt-4 justify-center items-center"> 
              <SecondaryNavLink to={"/sign-up"} className={"group text-primary bg-white hover:bg-secondary-light"}>
                    Join as Volunteer <ArrowRight className="inline-block size-5 transition-transform duration-300 group-hover:translate-x-1"/>
              </SecondaryNavLink>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative h-96 md:h-112 w-full rounded-3xl overflow-hidden shadow-lg group">
            <img
              src={HappyPawsShelter}
              alt="Happy Paws Shelter"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
              <h3 className="text-2xl text-center font-bold leading-snug text-secondary">
                Register Your Shelter
              </h3>
              <p className="mt-2 text-sm text-white text-center font-semibold">
                Connect with passionate volunteers, publish opportunities and receive support from people eager to help rescued cats.
              </p>
              <div className="flex mt-4 justify-center items-center"> 
              <SecondaryNavLink to={"/sign-up"} className={"group text-white bg-primary hover:bg-primary-dark"}>
                    Register Your Shelter <ArrowRight className="inline-block size-5 transition-transform duration-300 group-hover:translate-x-1"/>
              </SecondaryNavLink>
              </div>
            </div>
          </div>

        </div>
      </PaddingLayout>
    </section>
  )
}