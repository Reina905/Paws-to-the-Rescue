import { Clock, Award } from "lucide-react"
import { VolunteerPodiumCard } from "./VolunteerPodiumCard"

// Left→right display order: 2nd, 1st, 3rd
const PODIUM_ORDER = [2, 1, 3]

const STEP_HEIGHTS = { 1: 180, 2: 130, 3: 90 }

// All colors from index.css palette only — no gradients
const STEP_STYLE = {
  1: { bg: "bg-primary",       numColor: "text-primary-light", labelBg: "bg-primary-dark",   labelText: "text-white"      },
  2: { bg: "bg-secondary",     numColor: "text-primary-dark",  labelBg: "bg-primary-light",  labelText: "text-primary"    },
  3: { bg: "bg-tertiary",      numColor: "text-white",         labelBg: "bg-secondary-light", labelText: "text-primary"   },
}

const RING_STYLE = {
  1: "ring-4 ring-primary-dark",
  2: "ring-4 ring-tertiary",
  3: "ring-4 ring-secondary",
}

// Crown SVG — no emoji, no external image
const Crown = () => (
  <svg
    viewBox="0 0 40 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-6 mb-2"
    aria-hidden="true"
  >
    <path
      d="M2 22 L8 6 L20 16 L32 6 L38 22 Z"
      className="fill-tertiary stroke-primary"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="2"  cy="6"  r="2.5" className="fill-tertiary" />
    <circle cx="20" cy="4"  r="2.5" className="fill-tertiary" />
    <circle cx="38" cy="6"  r="2.5" className="fill-tertiary" />
  </svg>
)

const PodiumContestant = ({ volunteer }) => {
  const { place, name, hours, label } = volunteer
  const step    = STEP_STYLE[place]
  const ring    = RING_STYLE[place]
  const stepH   = STEP_HEIGHTS[place]
  const isFirst = place === 1

  return (
    <div className="flex flex-col items-center" style={{ width: isFirst ? 210 : 180 }}>
      {/* Crown only for 1st */}
      {isFirst && <Crown />}

      {/* Avatar with ring */}
      <div className={`rounded-full ${ring} mb-3 shadow-lg`}>
        <img
          src={`https://i.pravatar.cc/200?u=${name}`}
          alt={name}
          className="rounded-full object-cover block"
          style={{
            width:  isFirst ? 96 : 76,
            height: isFirst ? 96 : 76,
          }}
        />
      </div>

      {/* Name */}
      <p
        className="font-bold text-center text-primary-dark leading-tight px-2"
        style={{ fontSize: isFirst ? 15 : 13 }}
      >
        {name}
      </p>

      {/* Hours */}
      <div className="flex items-center gap-1 mt-1 mb-4">
        <Clock size={11} className="text-tertiary" />
        <span className="text-xs font-semibold text-tertiary">{hours} hrs</span>
      </div>

      {/* Step */}
      <div
        className={`w-full rounded-t-2xl flex flex-col items-center justify-start pt-4 gap-2 ${step.bg}`}
        style={{ height: stepH }}
      >
        <span className={`font-black leading-none select-none ${step.numColor}`} style={{ fontSize: isFirst ? 56 : 44 }}>
          {place}
        </span>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${step.labelBg} ${step.labelText}`}>
          <Award size={10} />
          {label}
        </div>
      </div>
    </div>
  )
}

/**
 * VolunteerPodium — desktop podium + mobile list.
 * Expects volunteers sorted by place (1st, 2nd, 3rd).
 */
export const VolunteerPodium = ({ volunteers }) => {
  const byPlace = Object.fromEntries(volunteers.map((v) => [v.place, v]))

  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col items-center gap-4 md:hidden">
        {volunteers.map((v) => (
          <VolunteerPodiumCard key={v.place} volunteer={v} />
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:flex md:justify-center md:items-end">
        {PODIUM_ORDER.map((place) => (
          <PodiumContestant key={place} volunteer={byPlace[place]} />
        ))}
      </div>

      {/* Base bar */}
      <div className="hidden md:block h-5 rounded-b-2xl mx-auto bg-primary-dark" style={{ maxWidth: 570 }} />
    </>
  )
}
