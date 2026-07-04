import { useMemo } from "react"
import CatPawIcon from "../assets/CatPawIcon.png"

/**
 * Renders a set of randomly-positioned, semi-transparent cat paw images
 * as a purely decorative background layer.
 *
 * @param {number} [count=12]   - Number of paws to render
 * @param {string} [className]  - Extra classes for the wrapper (e.g. "absolute inset-0")
 */
export const PawBackground = ({ count = 12, className = "absolute inset-0" }) => {
  // Generate positions once — stable across re-renders
  const paws = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 92}%`,
      left: `${Math.random() * 92}%`,
      // Size between 20 and 36px
      size: Math.floor(Math.random() * 17) + 20,
      // Rotation between -45° and 45°
      rotate: Math.floor(Math.random() * 91) - 45,
      // Opacity between 0.10 and 0.35
      opacity: +(Math.random() * 0.25 + 0.10).toFixed(2),
    }))
  }, [count])

  return (
    <div
      className={`${className} overflow-hidden pointer-events-none`}
      aria-hidden="true"
    >
      {paws.map((paw) => (
        <img
          key={paw.id}
          src={CatPawIcon}
          alt=""
          style={{
            position: "absolute",
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
