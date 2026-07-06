import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import OrangeLogo from "/src/assets/Logos/PawsToTheRescueLogoOrange.png"
import WhiteLogo from "/src/assets/Logos/PawsToTheRescueLogoWhite.png"
import { SecondaryNavLink } from "./SecondaryNavLink"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/volunteering", label: "Volunteering" },
  { to: "/shelters", label: "Shelters" },
  { to: "/about-us", label: "About Us" },
]

/**
 * Mobile navbar: burger bar + slide-down menu. Hidden at 950px+.
 * @param {boolean} isLight - Whether the navbar is in the light/solid style
 * @param {boolean} menuOpen - Whether the mobile menu is open
 * @param {function} setMenuOpen - Setter for menuOpen
 */
export const MobileNavbar = ({ isLight, menuOpen, setMenuOpen }) => (
  <>
    {/* Top bar with logo + burger */}
    <nav
      className={`min-[950px]:hidden flex font-semibold py-4 w-full items-center px-10 z-50 transition-all duration-300 ${
        isLight
          ? "bg-tertiary-light bg-opacity-5 text-primary fixed shadow-sm"
          : "absolute top-0 left-0 text-white"
      }`}
    >
      <div className="mr-auto">
        <Link to="/">
          <img
            src={menuOpen || isLight ? OrangeLogo : WhiteLogo}
            alt="Paws to the Rescue logo"
            className="w-45 h-auto min-h-12 min-w-33"
          />
        </Link>
      </div>

      <button
        className="ml-auto p-2 rounded-lg transition-colors duration-200"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <X size={24} className="text-primary" />
        ) : (
          <Menu size={24} />
        )}
      </button>
    </nav>

    {/* Slide-down menu */}
    <div
      className={`min-[950px]:hidden fixed top-0 left-0 w-full h-full z-40 bg-tertiary-light text-primary flex flex-col px-8 pt-24 pb-10 gap-4 transition-transform duration-300 ease-in-out ${
        menuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {NAV_LINKS.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          onClick={() => setMenuOpen(false)}
          className="text-lg font-semibold py-3 border-b border-gray-100 hover:text-tertiary transition-colors duration-200"
        >
          {label}
        </Link>
      ))}

      <div className="flex flex-col gap-3 mt-4">
        <SecondaryNavLink
          to="/login"
          className="text-white bg-tertiary hover:bg-tertiary text-center"
        >
          Log In
        </SecondaryNavLink>
        <SecondaryNavLink
          to="/sign-up"
          className="text-white bg-primary hover:bg-primary-dark text-center"
        >
          Sign Up
        </SecondaryNavLink>
      </div>
    </div>
  </>
)
