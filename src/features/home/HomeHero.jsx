import { Link } from 'react-router-dom'
import { Header } from '../../layouts/Header'
import OrangeCatCartoon from '/src/assets/OrangeCatCartoon.png'
import HeroHomeBackground from '/src/assets/HeroBackgroundVideo.mp4'

export const HomeHero = () => {
  return (
    <Header>
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src={HeroHomeBackground} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35 -z-10" />

      {/* Hero content */}
      <div className="flex flex-col justify-center items-center font-semibold gap-3 mt-auto mb-15 relative">
        <div className="mx-30 mb-5">
          <h1 className="text-center text-secondary text-5xl/15 font-extrabold">
            Become a hero for{" "}
            <img
              src={OrangeCatCartoon}
              className="inline-block w-15 h-16 align-baseline"
              alt="cat"
            />{" "}
            <span className="underline">in need!</span>
          </h1>
          <h4 className="text-center text-lg/8 font-bold">
            Connect with shelters, volunteer your time, and help cats receive
            the care and love they deserve
          </h4>
        </div>

        <div className="flex font-semibold gap-3">
          <Link
            to="/sign-up"
            className="py-2 px-3 rounded-xl bg-secondary-light/30 transition-all duration-300 ease-in-out hover:text-primary hover:bg-secondary-light"
          >
            Become a Volunteer
          </Link>
          <Link
            to="/sign-up"
            className="py-2 px-3 rounded-xl bg-primary/40 transition-all duration-300 ease-in-out hover:bg-primary"
          >
            Register Your Shelter
          </Link>
        </div>
      </div>
    </Header>
  )
}
