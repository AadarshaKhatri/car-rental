"use client";

import { useEffect, useState } from "react"
import Cars from "../../components/CarList/CarListCard"
import {  RentRequest } from "./components/FilterForm"
import { CarModel } from "@/lib/types";
import axios from "axios";


interface AllCarTypes extends CarModel {
  author: { 
    name:string,
  }
}
const AllCars = () => {
  const [rentalCars,setRentalCars] = useState<AllCarTypes []>();

  useEffect(()=>{
    async function FetchData () {

     const data : AllCarTypes[] = await ((await axios.get("/api/getRentalCars")).data)
     if(!data){
      return null
     }
     setRentalCars(data);
    }
    FetchData()
  },[])

  return (
    <section className="container max-w-full">
      <div className="flex flex-col justify-center items-center">
        
        {/* Table Here */}
        <div>
          <RentRequest/>
        </div>

        <div className="mt-5 w-full flex flex-wrap justify-start items-start gap-12">
        {
          rentalCars?.length === 0 ? 
           <div className="">
            <h3 className="text-4xl text-white">No Cars For Rent</h3>
           </div>
          : 
          rentalCars?.map((rentalCar,index)=>(
            <div key={index}>
            <Cars
            username={rentalCar.author?.name}
            brand={rentalCar.brand}
            id={rentalCar.id}
            mileage={rentalCar.mileage}
            no_seats={rentalCar.no_seats}
            pricePerDay={rentalCar.pricePerDay}
            status={rentalCar.status}
            transmission={rentalCar.transmission}
            year={rentalCar.year}
            authorId={rentalCar.authorId}

          />
            <p>Name:{rentalCar.brand}</p>
            <p>User:{rentalCar.authorId}</p>
            </div>
          ))
        }

        </div>

      </div>
    </section>
  )
}

export default AllCars