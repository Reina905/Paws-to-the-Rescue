import { PaddingLayout } from "../../layouts/PaddingLayout"
import { SectionHeader } from "../../components/SectionHeader"
import WhiteAndBlackCat from "../../assets/CartoonResources/WhiteAndBlackCat.png"

export const SheltersHero = () => {
  return (
    <>
         <div className="flex flex-col justify-center items-center font-semibold gap-3 mt-auto mb-15 relative">
           <div className="mx-25 mb-5">
             <h1 className="text-center text-5xl/15 font-extrabold">
               Kitties Are Waiting For 
               <span className="text-secondary"> You</span>
               {""}
               <img
                 src={WhiteAndBlackCat}
                 className="inline-block w-15 h-19 align-baseline"
                 alt="cat"
               /> 
             </h1>
             <h4 className="text-center text-lg/8 font-bold">
               What are you waiting for? Your time and effort can change their world!
             </h4>
           </div>
         </div>
       </>
  )
}
