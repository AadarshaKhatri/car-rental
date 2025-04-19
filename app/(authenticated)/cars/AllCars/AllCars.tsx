"use client";

import CarsForRental from "./components/CarsForRental";
import { RentRequest } from "./components/FilterForm";
import RentedCars from "./components/RentedCars";

const AllCars = () => {
  return (
    <section className="container max-w-full px-5 md:px-8 py-6">
      <div className="w-full flex flex-col md:flex-row gap-6">
        
        {/* Left Section (md+) */}
        <div className="flex flex-col gap-6 w-full md:w-3/4">
          {/* Show RentedCars FIRST on small screens */}
          <div className="block md:hidden order-1">
            <RentedCars />
          </div>

          {/* Rent Request Form */}
          <div className="order-2 md:order-1">
            <RentRequest />
          </div>

          {/* Cars For Rental Table */}
          <div className="order-3 md:order-2">
            <CarsForRental />
          </div>
        </div>

        {/* Right Section (RentedCars only on md+) */}
        <div className="hidden md:block w-full md:w-[350px] md:order-last">
          <RentedCars />
        </div>
      </div>
    </section>
  );
};

export default AllCars;
