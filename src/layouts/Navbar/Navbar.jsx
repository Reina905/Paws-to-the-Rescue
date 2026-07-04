import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import OrangeLogo from "/src/assets/PawsToTheRescueLogoOrange.png"
import WhiteLogo from "/src/assets/PawsToTheRescueLogoWhite.png"
import { NavLink } from "./NavLink"

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/volunteering", label: "Volunteering" },
  { to: "/shelters", label: "Shelters" },
  { to: "/about-us", label: "About Us" },
]

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`font-semibold flex py-4 w-full items-center px-10 z-9999 ${
        scrolled
          ? "bg-tertiary-light bg-opacity-5 text-primary fixed shadow-sm transition-all ease-in-out"
          : ""
      }`}
    >
      {/* Logo */}
      <div className="logo mr-auto">
        <Link to="/" className="link">
          <img
            src={scrolled ? OrangeLogo : WhiteLogo}
            alt="Paws to the Rescue logo"
            className="w-45 h-auto min-h-12 min-w-33"
          />
        </Link>
      </div>

      {/* Nav links */}
      <div className="links flex justify-center gap-4 font-semibold">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink key={to} to={to} scrolled={scrolled}>
            {label}
          </NavLink>
        ))}
      </div>

      {/* Auth buttons */}
      <div className="button-for-auth ml-auto flex gap-3">
        <Link
          to="/login"
          className={`link py-2 px-3 rounded-xl text-primary ${
            scrolled ? "bg-tertiary text-white hover:bg-tertiary" : "bg-white"
          } hover:bg-secondary-light transition-all duration-300 ease-in-out hover:-translate-y-0.5`}
        >
          Log In
        </Link>
        <Link
          to="/sign-up"
          className={`link py-2 px-3 rounded-xl ${
            scrolled ? "text-white" : ""
          } bg-primary hover:bg-primary-dark transition-all duration-300 ease-in-out hover:-translate-y-0.5`}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  )
}
