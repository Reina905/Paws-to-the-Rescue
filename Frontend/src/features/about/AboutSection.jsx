import { PaddingLayout } from "../../layouts/PaddingLayout";
import { SectionHeader } from "../../components/SectionHeader";
import GroupOfVolunteers from "../../assets/StaticResources/GroupOfVolunteers.PNG";
import WhiteAndBlackCat from "../../assets/CartoonResources/WhiteAndBlackCat.png"

export const AboutSection = () => {
  return (
    <section className="bg-tertiary-light py-20">
      <PaddingLayout>
        <div className="bg-white rounded-3xl shadow-md p-8 md:p-14">
          <div className="flex flex-col md:flex-row items-center gap-12">

            {/* Image */}
            <div className="relative md:w-2/5 shrink-0">
              <img
                src={GroupOfVolunteers}
                alt="Volunteers caring for rescued cats"
                className="w-full h-96 object-cover rounded-3xl shadow-md"
              />
                <img src={WhiteAndBlackCat} className="absolute -bottom-5 -right-8 h-20"></img>
            </div>

            {/* Content */}
            <div className="md:w-3/5">
              <SectionHeader title="A Community Built Around Compassion" />
              <p className="mt-2 text-secondary-dark leading-8">
                Paws to the Rescue was created in 2020 by a group of passionate animal
                lovers who believed that every rescued cat deserves safety,
                medical care and a chance to find a loving home.
              </p>
              <p className="mt-4 text-secondary-dark leading-8">
                Today, we work hand in hand with shelters and volunteers
                to organize rescue efforts, coordinate volunteer opportunities,
                and strengthen the local animal welfare community.
              </p>
            </div>
          </div>
        </div>
      </PaddingLayout>
    </section>
  );
};
