

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Armchair, Calendar, Fuel, KeySquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CarModel } from "@/lib/types"
import Link from "next/link"


interface CarProps extends CarModel {
  username:string,
}
const Cars =(props:CarProps) => {

  const cardContents = [
    {label:"Company", icon:Fuel,value:`${props.mileage} L`},
    {label:"Transmission", icon:KeySquare,value:`${props.transmission}`},
    {label:"MFD", icon:Calendar,value:`${props.year}`},
    {label:"Seats", icon:Armchair,value:`${props.no_seats}`},

  ]
  return (
    <section>
        <div>
              <Card className="relative w-[290px] px-3 gap-3">
            
                <Image
                src="/"
                alt="Car Iamges"
                width={100}
                height={100}
                className="w-full h-[200px] text-white"
                />
                <CardHeader className="px-0 flex justify-between items-center">
                  <CardTitle className="text-sm w-36 truncate overflow-hidden whitespace-nowrap">{props.brand}</CardTitle>
                  <CardDescription className="text-primary">{props.pricePerDay}<span className="text-secondary">/per hour</span></CardDescription>
                </CardHeader>
                <hr className="bg-white">
                </hr>
                <CardContent className="px-0 text-sm flex justify-between items-center gap-2 ">
                  {
                    cardContents.map(({value,icon : Icon},index)=>(
                      <div key ={index} className="flex justify-center items-center gap-1">
                        <Icon className="w-3 h-3 text-primary"/>
                        <p className="text-sm text-white/50 ">{value}</p>
                      </div>
                    ))
                  }
                </CardContent>
                <CardFooter className="px-0 mt-3">
                <div className="w-full flex flex-row justify-between items-center">
                  
                  <div className="flex  flex-row justify-between items-center gap-3">
                    <div className="w-[24px] h-[24px] bg-red-300 rounded-full">
                    {/* Image Here */}
        
                  </div>

                   <div>
                    <p className="text-sm text-secondary w-20 truncate overflow-hidden whitespace-nowrap">{props.username}</p>
                  </div>

                  </div>

                  <div className="flex">
                    <Link href ={`cars/${props.id}`}>
                    <Button>Rent out</Button>
                    </Link>

                  </div>
                </div>
                  </CardFooter>
             
              </Card>
              </div>
    </section>
  )
}

export default Cars