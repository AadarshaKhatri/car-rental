"use client"


import LayoutWrapper from "../LayoutWrapper"
import Banner from "./components/Banner/Banner"
import RecommendedCars from "./components/RecommendedCars/RecommendedCars"
import RentACar from "./components/RentACar/RentACar"




const DashboardPage = () => {
 
  

  return (
      <LayoutWrapper>
        <div className="w-full flex flex-col justify-between items-center gap-y-5">
          {/* Banner */}
            <Banner/>

            <RecommendedCars/>

            <RentACar/>
        </div>
       </LayoutWrapper>



  )
}

export default DashboardPage