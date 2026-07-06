import React from "react"
import { Link } from "react-router-dom"
import { PawPrint } from "lucide-react"
import PawsToTheRescue from '/src/assets/Logos/PawsToTheRescueLogoWhite.png'
import { PawBackground } from "../components/PawBackground"

export const Footer = () => {
  return (
    <footer className=" bg-primary text-white pt-16 pb-10 relative overflow-hidden">

      {/* Decorative background paw */}
      <PawBackground/>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className=" mb-4">
            <img src={PawsToTheRescue} alt="Paws To The Rescue Logo" className="h-15"/>
            </div>

            <p className="text-white/80 leading-7">
              Connecting volunteers with shelters to give every cat the care and love they deserve.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-white/80">
              <Link to="/home" className="hover:text-white transition">
                Home
              </Link>
              <Link to="/volunteering" className="hover:text-white transition">
                Volunteering
              </Link>
              <Link to="/shelters" className="hover:text-white transition">
                Shelters
              </Link>
              <Link to="/about-us" className="hover:text-white transition">
                About Us
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact
            </h3>

            <p className="text-white/80">
              Cat Fur, Catland
            </p>

            <p className="text-white/80 mt-2">
              contact@pawstorecue.org
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-10 pt-6 text-center text-white/70 text-sm">
          © {new Date().getFullYear()} Paws to the Rescue. All rights reserved.
        </div>

      </div>
    </footer>
  )
}