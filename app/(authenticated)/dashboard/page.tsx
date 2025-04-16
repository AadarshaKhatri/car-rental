"use client"

import LayoutWrapper from "../LayoutWrapper"
import RecommendedCars from "./components/RecommendedCars/RecommendedCars"
import RentACar from "./components/RentACar/RentACar"



const DashboardPage = () => {
 
  return (
      <LayoutWrapper>
        <div className="w-full flex flex-col justify-between items-center gap-y-5">
            {/* Banner */}
            <div className="w-full h-60 bg-primary/1  0 flex items-center justify-between px-8 text-white rounded-lg shadow-lg">
              <div className="flex flex-col space-y-4 max-w-lg">
                <h2 className="text-4xl font-semibold leading-tight">Find Your Next Adventure</h2>
                <p className="text-lg opacity-80">Explore a wide selection of cars that suit your lifestyle and needs.</p>
                <p className="bg-primary text-white px-6 py-2 rounded-lg font-semibold text-lg hover:bg-primary/80 transition cursor-pointer">
                  Explore Now
                </p>
              </div>

              {/* Car SVG Icon */}
              <div className="hidden md:block w-1/3">
                <div className="w-full h-full flex justify-center items-center">
                  {/* Car SVG */}
                  <svg className="text-gray-300 w-32 h-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <path d="M5 15V13H4c-1.1 0-1.99-.9-1.99-2L2 7c0-1.1.89-2 1.99-2H4V3c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v2h.01C19.11 5 20 5.89 20 7v4c0 1.1-.89 2-1.99 2H19v2c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-2H5c-1.1 0-2-.9-2-2zM5 10h14V7H5v3zm2 5h10v-2H7v2z" />
                  </svg>
                </div>
              </div>
            </div>



            <RecommendedCars/>

            <RentACar/>
        </div>
       </LayoutWrapper>



  )
}

export default DashboardPage