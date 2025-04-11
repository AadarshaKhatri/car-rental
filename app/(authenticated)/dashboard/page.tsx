"use client"

import LayoutWrapper from "../LayoutWrapper"
import RecommendedCars from "./components/RecommendedCars/RecommendedCars"
import RentACar from "./components/RentACar/RentACar"



const DashboardPage = () => {
 
  return (
      <LayoutWrapper>
        <div className="w-full flex flex-col justify-between items-center gap-y-10">

          <div className="w-full h-60  bg-gray-400">

          </div>


            <RecommendedCars/>

            <RentACar/>
        </div>
       </LayoutWrapper>



  )
}

export default DashboardPage