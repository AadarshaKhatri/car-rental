import { CarModel } from "@/lib/types";
import { useState,useEffect } from "react";
import axios from "axios";
import Cars from "@/app/(authenticated)/components/CarList/CarListCard";






interface AllCarTypes extends CarModel {
  author: { 
    name:string,
  },
  _count:{
    rentals:number,
  }
}
const CarsForRental = () => {
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
  },[]);
  console.log("Cars Avaliable for Rental",rentalCars)
  return (
    <section className="w-full pb-20">
       <div className="mt-5 w-full flex flex-wrap justify-evenly items-start gap-12">
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
                transmission={rentalCar.transmission}
                year={rentalCar.year}
                authorId={rentalCar.authorId}
                rentals={rentalCar._count.rentals}

              />
                
                </div>
              ))
            }

            </div>

    </section>
  )
}

export default CarsForRental