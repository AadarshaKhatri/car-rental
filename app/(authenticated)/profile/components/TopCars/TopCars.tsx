import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios";
import { useEffect, useState } from "react"


const TopCars = () => {
  const [data,setData] = useState();
  useEffect(()=>{
    async function FetchData(){
      const {data} = await axios.get("/api/getMostRentedCars");
      setData(data);
    }
    FetchData();
  },[])
  console.log("Rented Cars:",data);
  const topCars = [
    { name: "Hyundai Tucson", bookings: 92, rating: 4.8 },
    { name: "Tesla Model 3", bookings: 78, rating: 4.9 },
    { name: "Toyota Corolla", bookings: 65, rating: 4.5 },
    { name: "Ford Ranger", bookings: 58, rating: 4.3 },
  ]
  return (
    <Card>
            <CardHeader>
              <CardTitle>Top Performing Cars</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topCars.map((car, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-none">
                  <div>
                    <p className="text-sm font-medium text-primary">{car.name}</p>
                    <p className="text-xs text-muted-foreground">{car.bookings} bookings</p>
                  </div>
                  <span className="text-sm font-semibold text-yellow-500">⭐ {car.rating}</span>
                </div>
              ))}
            </CardContent>
          </Card>
  )
}

export default TopCars