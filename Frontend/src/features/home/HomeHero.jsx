import { Link } from 'react-router-dom'
import OrangeCatCartoon from '../../assets/CartoonResources/OrangeCatCartoon.png'

export const HomeHero = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center font-semibold gap-3 mt-auto mb-15 relative">
        <div className="mx-4 sm:mx-10 md:mx-25 mb-5">
          <h1 className="text-center text-2xl/8 sm:text-3xl/10 md:text-4xl/12 lg:text-5xl/15 font-extrabold">
            Become A Hero For
            <span className="text-secondary"> Kittens In Need!</span>
            <img
              src={OrangeCatCartoon}
              className="inline-block h-10 sm:h-14 md:h-19 align-baseline"
              alt="cat"
            />
          </h1>
          <h4 className="text-center text-sm/6 sm:text-base/7 md:text-lg/8 font-bold">
            Connect with shelters, volunteer your time, and help cats receive
            the care and love they deserve
          </h4>
        </div>

        <div className="flex font-semibold gap-3 mb-5">
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
    </>
  )
}
