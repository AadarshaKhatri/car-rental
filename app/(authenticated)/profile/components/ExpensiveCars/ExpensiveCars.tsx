import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios";

import Link from "next/link";
import { useEffect, useState } from "react"

interface ExpensiveCarTypes  {
  id:string,
  brand:string,
  pricePerDay:string,
}

const ExpensiveCars = () => {
  const [data,setData] = useState<ExpensiveCarTypes []>();
  useEffect(()=>{
    async function FetchData(){
      const {data} = await axios.get("/api/getMostExpensive");
      if(data) return setData(data);
    }
    FetchData();
  },[])



  return (
    <Card>
            <CardHeader>
              <CardTitle>Most Expensive Cars</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.map((expensiveCars, index) => (
                <div key={index} className="w-full flex justify-between items-center border-b pb-2 last:border-none ">
                  <Link className="w-full flex justify-between items-center border-b pb-2 last:border-none " href={`/cars/${expensiveCars?.id}`}>
                  <div>
                    {
                      expensiveCars?.brand 
                      ?
                      <p className="text-sm font-medium text-primary">{expensiveCars?.brand}</p>
                      :
                      null
                    }
                    <p className="text-xs text-muted-foreground">NPR {expensiveCars?.pricePerDay}/- per day</p>
                  </div>
                  

                </Link>
                </div>
              ))}
            </CardContent>
          </Card>
  )
}

export default ExpensiveCars