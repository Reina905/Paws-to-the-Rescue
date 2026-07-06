import { useState, useEffect } from "react"
import { DesktopNavbar } from "./DesktopNavbar"
import { MobileNavbar } from "./MobileNavbar"

export const Navbar = ({ variant = "transparent" }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (variant !== "transparent") return

    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [variant])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 950) setMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isLight = variant === "light" || scrolled

  return (
    <>
      <DesktopNavbar isLight={isLight} />
      <MobileNavbar isLight={isLight} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  )
}
