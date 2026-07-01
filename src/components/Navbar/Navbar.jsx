import React from 'react'
import { Link } from 'react-router-dom';
import OrangeLogo from '/src/assets/PawsToTheRescueLogoOrange.png'
import WhiteLogo from '/src/assets/PawsToTheRescueLogoWhite.png'
import hero from '/src/assets/orangeCat.png'

export const Navbar = () => {
  return (
    <>
      <nav className='flex p-4 text-white items-center font-semibold px-10'>
        <div className='logo mr-auto'>
          <Link to="/Home" className='link'>
            <img src={WhiteLogo} alt="Paws to the Rescue logo" className="w-45 h-auto min-h-12 min-w-33"/>
          </Link>
        </div>

        <div className='links flex justify-center gap-4'>
          <Link to="/home" className="link py-2 px-3 rounded-xl border border-transparent hover:text-secondary hover:bg-primary/50 transition-all duration-300 ease-in-out hover:-translate-y-0.5">Home</Link>
          <Link to="/volunteering-opportunities" className="link py-2 px-3 rounded-xl border border-transparent hover:text-secondary hover:bg-primary/50 transition-all duration-300 ease-in-out hover:-translate-y-0.5">Volunteering </Link>
          <Link to="/shelters" className="link py-2 px-3 rounded-xl border border-transparent hover:text-secondary hover:bg-primary/50 transition-all duration-300 ease-in-out hover:-translate-y-0.5" >Shelters </Link>
          <Link to="/about-us" className="link py-2 px-3 rounded-xl border border-transparent hover:text-secondary hover:bg-primary/50 transition-all duration-300 ease-in-out hover:-translate-y-0.5">About Us </Link>
        </div>

        <div className='button-for-auth ml-auto flex gap-3'>
          <Link to="/login" className='link py-2 px-3 rounded-xl bg-white text-primary hover:bg-primary-light transition-all duration-300 ease-in-out hover:-translate-y-0.5'>Log In </Link>
          <Link to="/sign-up" className='link py-2 px-3 rounded-xl bg-primary text-white hover:bg-primary-dark transition-all duration-300 ease-in-out hover:-translate-y-0.5'>Sign Up</Link>
        </div>
      </nav>
    </>
  )
}
