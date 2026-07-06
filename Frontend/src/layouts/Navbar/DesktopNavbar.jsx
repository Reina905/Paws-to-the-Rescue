import { Link } from "react-router-dom"
import OrangeLogo from "/src/assets/Logos/PawsToTheRescueLogoOrange.png"
import WhiteLogo from "/src/assets/Logos/PawsToTheRescueLogoWhite.png"
import { NavLink } from "./NavLink"
import { SecondaryNavLink } from "./SecondaryNavLink"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/volunteering", label: "Volunteering" },
  { to: "/shelters", label: "Shelters" },
  { to: "/about-us", label: "About Us" },
]

/**
 * Desktop navbar bar. Hidden below 950px.
 * @param {boolean} isLight - Whether the navbar is in the light/solid style
 */
export const DesktopNavbar = ({ isLight }) => (
  <nav
    className={`hidden min-[950px]:flex font-semibold py-4 w-full items-center px-10 z-50 transition-all duration-300 ${
      isLight
        ? "bg-tertiary-light bg-opacity-5 text-primary fixed shadow-sm"
        : "absolute top-0 left-0 text-white"
    }`}
  >
    {/* Logo */}
    <div className="mr-auto">
      <Link to="/">
        <img
          src={isLight ? OrangeLogo : WhiteLogo}
          alt="Paws to the Rescue logo"
          className="w-45 h-auto min-h-12 min-w-33"
        />
      </Link>
    </div>

    {/* Nav links */}
    <div className="flex justify-center gap-4 font-semibold">
      {NAV_LINKS.map(({ to, label }) => (
        <NavLink key={to} to={to} scrolled={isLight}>
          {label}
        </NavLink>
      ))}
    </div>

    {/* Auth buttons */}
    <div className="ml-auto flex gap-3">
      <SecondaryNavLink
        to="/login"
        className={
          isLight
            ? "text-white bg-tertiary hover:bg-tertiary"
            : "text-primary bg-white hover:bg-secondary-light"
        }
      >
        Log In
      </SecondaryNavLink>

      <SecondaryNavLink
        to="/sign-up"
        className={
          isLight
            ? "text-white bg-primary hover:bg-primary-dark"
            : "bg-primary hover:bg-primary-dark"
        }
      >
        Sign Up
      </SecondaryNavLink>
    </div>
  </nav>
)
