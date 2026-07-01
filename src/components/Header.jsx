import React from 'react'
import { Navbar } from './Navbar/Navbar'
import headerBackgroundVideo from '../assets/headerBackground.mp4';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <>
    <header className="w-full h-screen flex flex-col">
        <Navbar />
        <video autoPlay muted loop playsInline className="absolute top-0 -z-1 w-full h-full object-cover">
            <source src={headerBackgroundVideo} type="video/mp4" />
            Your browser can't reproduce videos
        </video>

        <div className='hero-information flex relative justify-center items-center'>
            <div className='metrics font-semibold gap-3 text-white mt-auto mb-10'>
                <Link to="/sign-up" className="link py-2 px-3 rounded-xl border border-secondary text-prymary bg-secondary/30 transition-all duration-300 ease-in-out hover:text-primary hover:bg-secondary">
                    Become a Volunteer
                </Link>
                <Link to="/sign-up" className="link py-2 px-3 rounded-xl border border-secondary text-white bg-primary/30 transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-light">Register Your Shelter</Link>
            </div>
        </div>
    </header>
    </>
  )
}
