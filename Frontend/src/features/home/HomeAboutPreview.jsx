import VolunterFeedingCats from "../../assets/StaticResources/VolunterFeedingCats.PNG"
import { PaddingLayout } from "../../layouts/PaddingLayout"
import { SectionHeader } from "../../components/SectionHeader"
import { SecondaryNavLink } from "../../layouts/Navbar/SecondaryNavLink"
import { ArrowRight } from "lucide-react"
import GrayCatWithAHeart from '../../assets/CartoonResources/GrayCatHeart.png'

export const HomeAboutPreview = () => {
  return (
    <section className="bg-tertiary-light py-20">
      <PaddingLayout>
        <div className="bg-white rounded-3xl shadow-md p-8 md:p-14">
          <div className="flex flex-col md:flex-row items-center gap-12">

            {/* Image */}
            <div className="relative md:w-2/5">
              <img
                src={VolunterFeedingCats}
                alt="Volunteer feeding rescued cats"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
               <img src={GrayCatWithAHeart} className="absolute -bottom-5 -right-8 h-20"></img>
            </div>

            {/* Text */}
            <div className="md:w-3/5">
              <SectionHeader title="About Us" />
              <p className="text-secondary-dark leading-8">
                Paws to the Rescue started with a small group of cat lovers who
                saw local shelters overwhelmed. Today, we bridge the gap between
                dedicated shelters and passionate volunteers like you. We provide
                the tools, the network, and the community to ensure no cat is left behind.
              </p>
              <div className="ml-auto flex mt-4 justify-center items-center"> 
              <SecondaryNavLink to={"/about-us"} className={"group text-white bg-primary hover:bg-primary-dark"}>
                    Learn more about us <ArrowRight className="inline-block size-5 transition-transform duration-300 group-hover:translate-x-1"/>
              </SecondaryNavLink>
              </div>
            </div>

          </div>
        </div>
      </PaddingLayout>
    </section>
  )
}