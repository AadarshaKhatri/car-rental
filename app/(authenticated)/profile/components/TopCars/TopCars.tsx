import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  CarModel, RentalModel } from "@/lib/types";
import axios from "axios";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react"

interface TopCarTypes extends CarModel {
 
  rentals : RentalModel [],
}

const TopCars = () => {
  const [data,setData] = useState<TopCarTypes []>();
  useEffect(()=>{
    async function FetchData(){
      const {data} = await axios.get("/api/getMostRentedCars");
      if(data) return setData(data);
    }
    FetchData();
  },[])

  return (
    <Card>
            <CardHeader>
              <CardTitle>Most Rented Cars</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.map((topCars, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-none">
                  <div>
                    {
                      topCars?.brand 
                      ?
                      <p className="text-sm font-medium text-primary">{topCars?.brand}</p>
                      :
                      null
                    }
                    <p className="text-xs text-muted-foreground">{topCars?.rentals?.length === 0 ? 0 : topCars?.rentals?.length} bookings</p>
                  </div>
                  <span
                    className={` flex items-center justify-center gap-2 text-md font-semibold ${
                      index === 0
                        ? "text-yellow-500"
                        : index === 1
                        ? "text-slate-500"
                        : index === 2
                        ? "text-amber-800"
                        : "text-primary"
                    }`}
                  >
                    {index + 1 <= 3 ? <Trophy className="h-5 w-5"/> : null} {index + 1}
                  </span>

                </div>
              ))}
            </CardContent>
          </Card>
  )
}

export default TopCars