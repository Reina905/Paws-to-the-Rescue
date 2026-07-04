import { PaddingLayout } from "../../layouts/PaddingLayout"
import { SectionHeader } from "../../components/SectionHeader"

export const SheltersHero = () => {
  return (
    <section className="bg-tertiary-light py-24">
      <PaddingLayout>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="Our Partner Shelters"
            subtitle="Meet the shelters making a difference every day. Explore their mission, discover active volunteer opportunities and support the amazing work they do for rescued cats."
          />
        </div>
      </PaddingLayout>
    </section>
  )
}
