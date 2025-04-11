"use client"
import { useEffect, useState } from "react"
import { CarModel } from "@/lib/types"
import axios from "axios"
import Cars from "@/app/(authenticated)/components/CarList/CarListCard"

interface recommendedCars extends CarModel {
  author:{
    name:string,
    id:string,
  }
}

const RecommendedCars = () => {
  const [cars,setCars] = useState<recommendedCars [] | null>();

  useEffect(()=>{
    async function FetchData(){
      const {data} = await axios.get("/api/getRecommendedCars");
      setCars(data);
    }
    FetchData();
  },[])
  if (!cars || cars.length === 0) return null
  return (
    <div>
         
          <div className="w-full flex flex-col  justify-start items-start gap-5">
            <h2>Recommended Cars for you</h2>

            <div className="flex flex-wrap justify-start items-center gap-5">
              {/* Cards Here*/}
              {cars?.map((car) => (
                <div key={car.id}>
                  <Cars
                  transmission={car.transmission}
                  brand={car.brand}
                  mileage={car.mileage}
                  no_seats={car.no_seats}
                  pricePerDay={car.pricePerDay}
                  year={car.year}
                  username={car.author.name}
                  authorId={car.author.id}
                  key={car.id}
                  id={car.id}
                  />
                  </div>
                ))}
            </div>
          </div>
        </div>
        )
      }

export default RecommendedCars