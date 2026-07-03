import React from 'react'
import { Link } from 'react-router-dom';
import OrangeLogo from '/src/assets/PawsToTheRescueLogoOrange.png'
import WhiteLogo from '/src/assets/PawsToTheRescueLogoWhite.png'
import { useState, useEffect} from 'react';
import { useLocation } from "react-router-dom"

export const Navbar = () => {
  const location = useLocation()
  const isHome = location.pathname === "/"

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) return

    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHome])

  const finalScrolled = isHome ? scrolled : true

  return (
    <>
      <nav className={`font-semibold flex py-4 w-full items-center px-10 z-9999 ${finalScrolled ? 'bg-tertiary-light bg-opacity-5 text-primary fixed shadow-sm transition-all ease-in-out' : ''}`}>
        <div className='logo mr-auto'>
          <Link to="/" className='link'>
            <img src={`${finalScrolled ? OrangeLogo : WhiteLogo}`} alt="Paws to the Rescue logo" className="w-45 h-auto min-h-12 min-w-33"/>
          </Link>
        </div>

        <div className='links flex justify-center gap-4 font-semibold'>
          <Link to="/" className={`relative py-2 px-3 transition-all duration-300 ${finalScrolled ? "hover:text-text-primary": "hover:text-secondary"}
                                  after:absolute
                                  after:left-0
                                  after:bottom-0
                                  after:h-0.5
                                  after:w-0
                                  ${finalScrolled ? "after:bg-text-primary": "after:bg-secondary"}
                                  after:transition-all
                                  after:duration-300
                                  hover:after:w-full`}>
                                    Home
                                    </Link>
          <Link to="/volunteering" className={`relative py-2 px-3 transition-all duration-300 ${finalScrolled ? "hover:text-text-primary": "hover:text-secondary"}
                                  after:absolute
                                  after:left-0
                                  after:bottom-0
                                  after:h-0.5
                                  after:w-0
                                  ${finalScrolled ? "after:bg-text-primary": "after:bg-secondary"}
                                  after:transition-all
                                  after:duration-300
                                  hover:after:w-full`}>
                                    Volunteering 
                                    </Link>
          <Link to="/shelters" className={`relative py-2 px-3 transition-all duration-300 ${finalScrolled ? "hover:text-text-primary": "hover:text-secondary"}
                                  after:absolute
                                  after:left-0
                                  after:bottom-0
                                  after:h-0.5
                                  after:w-0
                                  ${finalScrolled ? "after:bg-text-primary": "after:bg-secondary"}
                                  after:transition-all
                                  after:duration-300
                                  hover:after:w-full`}>
                                    Shelters 
                                    </Link>
          <Link to="/about-us" className={`relative py-2 px-3 transition-all duration-300 ${finalScrolled ? "hover:text-text-primary": "hover:text-secondary"}
                                  after:absolute
                                  after:left-0
                                  after:bottom-0
                                  after:h-0.5
                                  after:w-0
                                  ${finalScrolled ? "after:bg-text-primary": "after:bg-secondary"}
                                  after:transition-all
                                  after:duration-300
                                  hover:after:w-full`}>
                                    About Us 
                                    </Link>
        </div>

        <div className='button-for-auth ml-auto flex gap-3'>
          <Link to="/login" className={`link py-2 px-3 rounded-xl text-primary ${finalScrolled ? "bg-tertiary text-white hover:bg-tertiary" : "bg-white"} hover:bg-secondary-light transition-all duration-300 ease-in-out hover:-translate-y-0.5`}>Log In </Link>
          <Link to="/sign-up" className={`link py-2 px-3 rounded-xl ${finalScrolled ? "text-white" : ""} bg-primary hover:bg-primary-dark transition-all duration-300 ease-in-out hover:-translate-y-0.5`}>Sign Up</Link>
        </div>
      </nav>
    </>
  )
}
