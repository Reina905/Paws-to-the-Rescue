import { useRef } from "react"
import { useCountUp } from "react-countup"
import { Users, House, Cat, CalendarDays } from "lucide-react"
import { PaddingLayout } from "../../layouts/PaddingLayout"
import { SectionHeader } from "../../components/SectionHeader"
import { PawBackground } from "../../components/PawBackground"

const STATS = [
  { icon: Users,        value: 500,  suffix: "+", label: "Active Volunteers"   },
  { icon: House,        value: 50,   suffix: "+", label: "Partner Shelters"    },
  { icon: Cat,          value: 2000, suffix: "+", label: "Cats Helped"         },
  { icon: CalendarDays, value: 150,  suffix: "+", label: "Community Events"    },
]

const StatCard = ({ icon: Icon, value, suffix, label }) => {
  const countRef = useRef(null)

  useCountUp({
    ref: countRef,
    end: value,
    duration: 2.5,
    separator: ",",
    suffix,
    startOnMount: true,
    enableScrollSpy: true,
    scrollSpyOnce: true,
  })

  return (
    <div className="bg-white rounded-3xl p-7 shadow-md flex items-center gap-5">
      <div className="w-14 h-14 rounded-2xl bg-secondary-light flex items-center justify-center shrink-0">
        <Icon size={26} className="text-primary" />
      </div>
      <div>
        <p className="text-3xl font-bold text-primary leading-none">
          <span ref={countRef} />
        </p>
        <p className="text-secondary-dark text-sm mt-1">{label}</p>
      </div>
    </div>
  )
}

export const AboutImpact = () => (
  <section className="relative bg-tertiary-light py-20">
    <PawBackground pawColor="text-primary-dark" />
    <PaddingLayout>
      <SectionHeader
        label="Our Impact"
        title="Together We Make a Difference"
        subtitle="Every volunteer, shelter and rescued cat represents another step toward creating a safer and more compassionate community for animals in need."
        className="mb-16"
      />

      <div className="grid lg:grid-cols-3 gap-8 items-center">
        {/* Left stats */}
        <div className="space-y-5">
          {STATS.slice(0, 2).map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Center highlight */}
        <div className="bg-primary rounded-3xl shadow-md p-10 text-center">
          <h3 className="text-2xl font-bold text-white leading-snug">
            Building Hope,<br />One Cat at a Time
          </h3>
          <p className="mt-6 text-sm text-primary-light leading-7">
            Our community continues to grow thanks to the incredible dedication
            of volunteers, shelters and supporters who believe every rescued cat
            deserves a second chance.
          </p>
          <div className="mt-8 flex justify-center">
            <Cat size={48} className="text-secondary opacity-80" />
          </div>
        </div>

        {/* Right stats */}
        <div className="space-y-5">
          {STATS.slice(2).map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </PaddingLayout>
  </section>
)
