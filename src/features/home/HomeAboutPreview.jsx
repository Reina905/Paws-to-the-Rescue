import { PaddingLayout } from "../../layouts/PaddingLayout"
import VolunteerFeedingCats from "../../assets/VolunteerFeedingCats.PNG"
import { SectionHeader } from "../../components/SectionHeader"

export const HomeAboutPreview = () => {
  return (
    <section className="bg-tertiary-light py-20">
      <PaddingLayout>
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-14">
          <div className="flex flex-col md:flex-row items-center gap-12">

            {/* Image */}
            <div className="relative md:w-2/5">
              <img
                src={VolunteerFeedingCats}
                alt="Volunteer feeding rescued cats"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-5 -right-5 bg-primary text-white px-5 py-3 rounded-2xl shadow-lg">
                Founded by Cat Lovers
              </div>
            </div>

            {/* Text */}
            <div className="md:w-3/5">
              <SectionHeader title="About Us" />
              <p className="text-gray-600 leading-8">
                Paws to the Rescue started with a small group of cat lovers who
                saw local shelters overwhelmed. Today, we bridge the gap between
                dedicated shelters and passionate volunteers like you. We provide
                the tools, the network, and the community to ensure no cat is left behind.
              </p>
              <button className="mt-8 px-7 py-3 bg-primary text-white rounded-full shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all duration-300">
                More Details
              </button>
            </div>

          </div>
        </div>
      </PaddingLayout>
    </section>
  )
}
