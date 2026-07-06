import React from 'react'
import VolunteerFeedingCats from "../assets/HeroStaticResources/VolunteerHelpingWithCleaning.PNG"
import { PaddingLayout } from '../layouts/PaddingLayout'

export const ImageTextCard = () => {
    return (
        <div className="py-8 flex flex-col md:flex-row gap-5 items-center">
            <div className="h-112.5 w-full rounded-3xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
                <img
                    src={VolunteerFeedingCats}
                    alt="Volunteer helping"
                    className=" h-full w-full object-cover"
                />
            </div>

            <div className="h-112.5 w-full bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                <p className='flex items-center justify-center'>500+</p>
                <p className='flex items-center justify-center'> Volunteers</p>
            </div>
        </div>
    )
}