import { Award, Clock } from "lucide-react"

const RING_STYLE = {
  1: "ring-4 ring-primary-dark",
  2: "ring-4 ring-tertiary",
  3: "ring-4 ring-secondary",
}

/**
 * VolunteerPodiumCard — mobile list card for a single volunteer.
 */
export const VolunteerPodiumCard = ({ volunteer }) => {
  const { place, name, hours, label } = volunteer
  const ring = RING_STYLE[place] ?? RING_STYLE[3]

  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl shadow-md px-5 py-4 w-full max-w-sm">
      {/* Avatar with palette ring */}
      <div className={`rounded-full ${ring} shrink-0`}>
        <img
          src={`https://i.pravatar.cc/200?u=${name}`}
          alt={name}
          className="w-14 h-14 rounded-full object-cover block"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-lg font-black text-primary">#{place}</span>
          <span className="font-bold text-primary text-sm truncate">{name}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-tertiary font-semibold">
          <Clock size={11} />
          {hours} hrs este mes
        </div>
        <div className="mt-1 inline-flex items-center gap-1 bg-secondary-light text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
          <Award size={10} />
          {label}
        </div>
      </div>
    </div>
  )
}
