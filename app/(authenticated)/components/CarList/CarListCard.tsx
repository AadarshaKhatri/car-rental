import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Armchair, Calendar, Fuel, KeySquare } from "lucide-react"

const Cars = () => {
  const cardContents = [
    {label:"Company", icon:Fuel,value:"80 L"},
    {label:"Transmission", icon:KeySquare,value:"Manaual"},
    {label:"MFD", icon:Calendar,value:"2012"},
    {label:"Seats", icon:Armchair,value:"2"},

  ]
  return (
    <section>
        <div>
              <Card className="relative w-[290px] px-3 gap-3">
                <span className="absolute right-5 bottom-32 text-sm bg-green-500 px-2 py-1 rounded text-background">Available</span>
                <Image
                src="/"
                alt="Car Iamges"
                width={100}
                height={100}
                className="w-full h-[200px] text-white"
                />
                <CardHeader className="px-0 flex justify-between items-center">
                  <CardTitle className="text-sm">Name of the Car</CardTitle>
                  <CardDescription className="text-primary">Price<span className="text-secondary">/per hour</span></CardDescription>
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
                <CardFooter className="p-0 text-sm text-secondary">By Aadarsha Khatri</CardFooter>
              </Card>
              </div>
    </section>
  )
}

export default Cars