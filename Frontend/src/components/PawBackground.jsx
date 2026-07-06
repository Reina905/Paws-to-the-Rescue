import { PawPrint } from "lucide-react"

export const PawBackground = ({
  className = "absolute inset-0",
  pawColor = "text-primary-light"
}) => {
  const paws = [
    { top: "8%", left: "10%", size: 35, rotate: -20, opacity: 0.12 },
    { top: "20%", left: "80%", size: 40, rotate: 15, opacity: 0.18 },
    { top: "35%", left: "25%", size: 35, rotate: 40, opacity: 0.15 },
    { top: "50%", left: "70%", size: 30, rotate: -30, opacity: 0.14 },
    { top: "68%", left: "12%", size: 35, rotate: 10, opacity: 0.16 },
    { top: "82%", left: "60%", size: 40, rotate: -15, opacity: 0.13 },
  ]

  return (
    <div
      className={`${className} overflow-hidden pointer-events-none`}
      aria-hidden="true"
    >
      {paws.map((paw, index) => (
        <PawPrint
          key={index}
          className={`absolute ${pawColor}`}
          style={{
            top: paw.top,
            left: paw.left,
            width: paw.size,
            height: paw.size,
            opacity: paw.opacity,
            transform: `rotate(${paw.rotate}deg)`,
            userSelect: "none",
          }}
        />
      ))}
    </div>
  )
}