import React from "react";
import WhiteCatAndAButterfly from "../../assets/CartoonResources/WhiteCatAndAButterfly.png";

export const AboutHero = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center font-semibold gap-3 mt-auto mb-15 relative">
        <div className="mx-4 sm:mx-10 md:mx-25 mb-5">
          <h1 className="text-center text-2xl/8 sm:text-3xl/10 md:text-4xl/12 lg:text-5xl/15 font-extrabold">
            <img
              src={WhiteCatAndAButterfly}
              className="inline-block h-14 sm:h-20 md:h-28 align-baseline"
              alt="cat"
            /> {""}
            Every Cat Deserves
            <span className="text-secondary"> Love And Care</span>
          </h1>
          <h4 className="text-center text-sm/6 sm:text-base/7 md:text-lg/8 font-bold">
            Get to know about the creators of Paws to the Rescue and how we are making a difference in the lives of many cats
          </h4>
        </div>
      </div>
    </>
  );
}