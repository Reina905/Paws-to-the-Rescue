import React from "react";
import GrayCatHeart from "../../assets/CartoonResources/GrayCatHeart.png";

export const AboutHero = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center font-semibold gap-3 mt-auto mb-15 relative">
        <div className="mx-25 mb-5">
          <h1 className="text-center text-5xl/15 font-extrabold">
            <img
              src={GrayCatHeart}
              className="inline-block w-15 h-16 align-baseline"
              alt="cat"
            /> {""}
            Every Cat Deserves
            <span className="text-secondary"> Love And Care</span>
          </h1>
          <h4 className="text-center text-lg/8 font-bold">
            Get to know about the creators of Paws to the Rescue and how we are making a difference in the lives of many cats
          </h4>
        </div>
      </div>
    </>
  );
}