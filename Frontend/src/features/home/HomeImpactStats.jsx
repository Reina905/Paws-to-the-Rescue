import { useRef } from "react"
import { useCountUp } from "react-countup"
import GroupOfCats from "../../assets/CartoonResources/GroupOfCats.png"
import { PawBackground } from "../../components/PawBackground"
import { PaddingLayout } from "../../layouts/PaddingLayout"

const STATS = [
  { end: 500,  suffix: "+", label: "Volunteers"              },
  { end: 50,   suffix: "+", label: "Partner Shelters"        },
  { end: 2000, suffix: "+", label: "Cats Helped"             },
  { end: 150,  suffix: "+", label: "Volunteer Opportunities" },
]

const StatItem = ({ end, suffix, label }) => {
  const countRef = useRef(null)

    useCountUp({
      ref: countRef,
      end,
      duration: 2.5,
      separator: ",",
      suffix,
      startOnMount: true,
      enableScrollSpy: true,
      scrollSpyOnce: true,
    })

  return (
    <div className="flex items-start gap-5 py-2">
      <div>
        <p className="text-5xl font-bold text-white leading-none">
          <span ref={countRef} />
        </p>
        <p className="mt-2 text-base font-medium text-primary-light">
          {label}
        </p>
      </div>
    </div>
  )
}

export const HomeImpactStats = () => (
  <section className="relative bg-primary py-20">
    <PawBackground/>
<PaddingLayout>
    <div className="text-center mb-14">
      <h2 className="font-bold text-white text-4xl">
        Our Impact
      </h2>
      {/* Decorative bar */}
      <div className="w-20 h-1 bg-white mx-auto mt-4 rounded-3xl"></div>
    </div>

    {/* Two-column layout: metrics left, image right */}
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">

      {/* Metrics — 2×2 grid */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-4 flex-1">
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>

      {/* Group of cats image */}
      <div className="shrink-0">
        <img
          src={GroupOfCats}
          alt="Group of cats"
          className="w-72 lg:w-96 object-contain drop-shadow-xl"
        />
      </div>

    </div>
    </PaddingLayout>
  </section>
)
