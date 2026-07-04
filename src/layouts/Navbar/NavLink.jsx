import { Link } from "react-router-dom"

/**
 * A navbar navigation link with an animated underline on hover.
 * @param {string} to - Route path
 * @param {boolean} scrolled - Whether the navbar is in scrolled/solid state
 * @param {React.ReactNode} children
 */
export const NavLink = ({ to, scrolled, children }) => (
  <Link
    to={to}
    className={`
      relative py-2 px-3 transition-all duration-300
      ${scrolled ? "hover:text-text-primary" : "hover:text-secondary"}
      after:absolute after:left-0 after:bottom-0
      after:h-0.5 after:w-0
      ${scrolled ? "after:bg-text-primary" : "after:bg-secondary"}
      after:transition-all after:duration-300
      hover:after:w-full
    `}
  >
    {children}
  </Link>
)
