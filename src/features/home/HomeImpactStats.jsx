import { PaddingLayout } from "../../layouts/PaddingLayout"
import { SectionHeader } from "../../components/SectionHeader"

export const HomeImpactStats = () => {
  const stats = [
    { value: "500+", label: "Volunteers" },
    { value: "50+", label: "Partner Shelters" },
    { value: "2,000+", label: "Cats Helped" },
    { value: "150+", label: "Events" },
  ]

  return (
    <section className="bg-white py-24">
      <PaddingLayout>
        <SectionHeader
          title="Our Impact"
          subtitle="Every volunteer, shelter, and rescue contributes to building a safer future for cats in our community."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-tertiary-light rounded-3xl p-8 text-center shadow-md">
              <h3 className="text-5xl font-bold text-primary">{stat.value}</h3>
              <p className="mt-3 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </PaddingLayout>
    </section>
  )
}
