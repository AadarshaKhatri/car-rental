import Cars from "@/app/(authenticated)/components/CarList/CarListCard"
import { CarModel } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react"


interface AllCarsTypes extends CarModel {
  author:{
    name:string,
    id:string,
  },
  _count:{
    rentals:number,
  }
}

const RentACar = () => {
  const [cars,setCars] = useState<AllCarsTypes []>();

  useEffect(()=>{
    async function FetchData(){
      const {data} = await axios.get("/api/getAllCars");
      if (data) setCars(data);
    }
    FetchData();
  },[])
  console.log("Cars",cars);


  return (
    <section className="w-full">
           <div className="w-full flex flex-col  justify-start items-start gap-5 py-10">
              <div className="flex py-4">
               <h2>Rent A Car</h2>
              </div>

            <div className="flex flex-wrap justify-start items-center gap-10">
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
                  rentals={car._count.rentals}
                  />
                  </div>
                ))}
            </div>

            <div className="w-full flex justify-center items-center pt-16 pb-2">
              <div className="text-gray-700 px-6 py-1 rounded-xl  text-center">
                <p className="text-md font-medium text-primary">🚗 You&apos;ve reached the end of the listings.</p>
                <p className="text-sm mt-1 text-gray-700">More cars will be added soon. Stay tuned!</p>
              </div>
            </div>

          </div>
    </section>
  )
}

export default RentACar