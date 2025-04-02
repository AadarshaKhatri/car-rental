"use client";

import CarsForRental from "./components/CarsForRental";
import {  RentRequest } from "./components/FilterForm"
import RentedCars from "./components/RentedCars";



const AllCars = () => {

  return (
    <section className="container max-w-full">
    <div className="w-full flex flex-col justify-center items-center">
      
      <div className="relative w-full flex flex-row justify-between items-start gap-5">
        <div className="w-full flex flex-col justify-center items-center gap-10">
          <div className="w-full flex-1">
            <RentRequest />
          </div>
          
          <div>
            <CarsForRental />
          </div>
        </div>
  
        {/* Adjusted RentedCars Placement */}
        <div className="w-[350px] flex flex-col items-end">
          <RentedCars />
        </div>
      </div>
    </div>
  </section>
  
  )
}

export default AllCars