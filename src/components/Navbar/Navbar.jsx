import React from 'react'
import { Link } from 'react-router-dom';
import OrangeLogo from '/src/assets/PawsToTheRescueLogoOrange.png'
import WhiteLogo from '/src/assets/PawsToTheRescueLogoWhite.png'
import { useState, useEffect} from 'react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`flex py-4 w-full items-center px-10 z-9999 ${scrolled ? 'bg-tertiary-light bg-opacity-5 text-primary fixed shadow-sm transition-all ease-in-out' : ''}`}>
        <div className='logo mr-auto'>
          <Link to="/Home" className='link'>
            <img src={`${scrolled ? OrangeLogo : WhiteLogo}`} alt="Paws to the Rescue logo" className="w-45 h-auto min-h-12 min-w-33"/>
          </Link>
        </div>

        <div className='links flex justify-center gap-4'>
          <Link to="/home" className={`relative py-2 px-3 transition-all duration-300 ${scrolled ? "hover:text-text-primary": "hover:text-secondary"}
                                  after:absolute
                                  after:left-0
                                  after:bottom-0
                                  after:h-0.5
                                  after:w-0
                                  ${scrolled ? "after:bg-text-primary": "after:bg-secondary"}
                                  after:transition-all
                                  after:duration-300
                                  hover:after:w-full`}>
                                    Home
                                    </Link>
          <Link to="/volunteering-opportunities" className={`relative py-2 px-3 transition-all duration-300 ${scrolled ? "hover:text-text-primary": "hover:text-secondary"}
                                  after:absolute
                                  after:left-0
                                  after:bottom-0
                                  after:h-0.5
                                  after:w-0
                                  ${scrolled ? "after:bg-text-primary": "after:bg-secondary"}
                                  after:transition-all
                                  after:duration-300
                                  hover:after:w-full`}>
                                    Volunteering 
                                    </Link>
          <Link to="/shelters" className={`relative py-2 px-3 transition-all duration-300 ${scrolled ? "hover:text-text-primary": "hover:text-secondary"}
                                  after:absolute
                                  after:left-0
                                  after:bottom-0
                                  after:h-0.5
                                  after:w-0
                                  ${scrolled ? "after:bg-text-primary": "after:bg-secondary"}
                                  after:transition-all
                                  after:duration-300
                                  hover:after:w-full`}>
                                    Shelters 
                                    </Link>
          <Link to="/about-us" className={`relative py-2 px-3 transition-all duration-300 ${scrolled ? "hover:text-text-primary": "hover:text-secondary"}
                                  after:absolute
                                  after:left-0
                                  after:bottom-0
                                  after:h-0.5
                                  after:w-0
                                  ${scrolled ? "after:bg-text-primary": "after:bg-secondary"}
                                  after:transition-all
                                  after:duration-300
                                  hover:after:w-full`}>
                                    About Us 
                                    </Link>
        </div>

        <div className='button-for-auth ml-auto flex gap-3'>
          <Link to="/login" className='link py-2 px-3 rounded-xl bg-white text-primary hover:bg-secondary-light transition-all duration-300 ease-in-out hover:-translate-y-0.5'>Log In </Link>
          <Link to="/sign-up" className={`link py-2 px-3 rounded-xl ${scrolled ? "text-white" : ""} bg-primary hover:bg-primary-dark transition-all duration-300 ease-in-out hover:-translate-y-0.5`}>Sign Up</Link>
        </div>
      </nav>
    </>
  )
}
