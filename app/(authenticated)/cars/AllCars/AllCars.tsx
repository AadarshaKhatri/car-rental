"use client";

import CarsForRental from "./components/CarsForRental";
import {  RentRequest } from "./components/FilterForm"
import RentedCars from "./components/RentedCars";



const AllCars = () => {

  return (
    <section className="container max-w-full">
      <div className="flex flex-col justify-center items-center">
        
        {/* Table Here */}
        <div className="flex flex-row justify-between items-start gap-10">

          <div className="flex flex-col justify-center items-center gap-10">
            <div className="w-full flex-1">
              <RentRequest/>
            </div>
            
            <div>
              <CarsForRental/>

            </div>
           
          </div>
          
          <div className="w-full flex justify-end items-end">
            <RentedCars/>
          </div>
        </div>

       

      </div>
    </section>
  )
}

export default AllCars