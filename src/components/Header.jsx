import React from 'react'
import { Navbar } from './Navbar/Navbar'
import { Link } from 'react-router-dom';
import OrangeCatCartoon  from '/src/assets/OrangeCatCartoon.png'

export const Header = () => {
  return (
    <>
    <header className="w-full h-screen flex flex-col text-white font-semibold">
        <Navbar />
        <video autoPlay muted loop playsInline className="absolute top-0 -z-1 w-full h-full object-cover">
            <source src="https://nlkcuneetsqclvqvlcjb.supabase.co/storage/v1/object/public/MultimediaResources/HeroBackground.mp4" type="video/mp4" />
            Your browser can't reproduce videos
        </video>

        <div className='hero-information flex flex-col relative justify-center items-center font-semibold gap-3 mt-auto mb-15'>   
            <div className='mx-30 mb-5'>
                <h1 className='text-center text-secondary text-5xl/15 font-extrabold'>
                    Become a hero for {<img src={OrangeCatCartoon} className='inline-block w-15 h-16 align-baseline'></img>} <span className='underline'>in need!</span>
                </h1>
                <h4 className='text-center text-lg/8 font-bold'>Connect with shelters, volunteer your time, and help cats receive the care and love they deserve</h4>
            </div>

            <div className='hero-buttons flex font-semibold gap-3'>
                <Link to="/sign-up" className="link py-2 px-3 rounded-xl bg-secondary-light/30 transition-all duration-300 ease-in-out hover:text-primary hover:bg-secondary-light">
                    Become a Volunteer
                </Link>
                <Link to="/sign-up" className="link py-2 px-3 rounded-xl bg-primary/40 transition-all duration-300 ease-in-out hover:bg-primary">
                    Register Your Shelter
                </Link>
            </div>
        </div>
    </header>
    </>
  )
}
