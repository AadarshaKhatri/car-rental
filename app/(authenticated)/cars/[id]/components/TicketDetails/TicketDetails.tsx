"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CarModel } from "@/lib/types";
import axios from "axios";
import { Armchair, Calendar, Car, Fuel, KeySquare } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Booking {
    booked_user: {
      name: string;
    };
  }
  
  interface Rental {
    id:string,
    endDate: string; 
    startDate: string; 
    status: string;
  }
  
  interface CarInformationTypes extends CarModel { 
    booking: Booking [],
    rentals: Rental []
  }

const TicketDetails = () => {
  const params = useParams();
  const [cars, setCars] = useState<CarInformationTypes>();

    useEffect(()=>{
      async function FetchData(){
      const {data} = await axios.get(`/api/getCarInformation/${params.id}`);
       setCars(data);
      }
      FetchData();
    },[params]);

  useEffect(()=>{
    async function FetchData(){
    const {data} = await axios.get(`/api/getCarInformation/${params.id}`);
     setCars(data);
    }
    FetchData();
  },[params]);

  const cardContents = [
    {label:"Company", icon:Fuel,value:`${cars?.mileage} L`},
    {label:"Transmission", icon:KeySquare,value:`${cars?.transmission}`},
    {label:"MFD", icon:Calendar,value:`${cars?.year}`},
    {label:"Seats", icon:Armchair,value:`${cars?.no_seats}`},
  
    
  ]
  return (
          <Card className="w-full rounded-xl border border-gray-800 text-white px-10 mt-6  relative">
          <CardContent className="p-6">

            {/* Ticket Header */}
            <div className="flex items-center gap-3 mb-4">
              <Car className="text-primary w-8 h-8" />
              <h2 className="text-2xl font-bold text-primary">Booking Confirmation</h2>
            </div>

            {/* Ticket Body */}
            <div className="relative border-dashed border-t border-gray-600 my-4"></div> {/* Dashed Divider */}

            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-md font-semibold text-gray-300">Booked By:</p>
                <p className="text-md text-white">Your Name</p>
              </div>

              <div className="flex justify-between">
                <p className="text-md font-semibold text-gray-300">Start Date:</p>
                <div className="flex items-center gap-2">
                  <Calendar className="text-blue-400 w-4 h-4" />
                  <p className="text-md text-white">October 10, 2025</p>
                </div>
              </div>

              <div className="flex justify-between">
                <p className="text-md font-semibold text-gray-300">End Date:</p>
                <div className="flex items-center gap-2">
                  <Calendar className="text-blue-400 w-4 h-4" />
                  <p className="text-md text-white">October 15, 2025</p>
                </div>
              </div>
            </div>

            {/* Dashed Divider */}
            <div className="relative border-dashed border-t border-gray-600 my-4"></div>

            {/* Car Details in Ticket */}
            <div className="grid grid-cols-2 gap-3 text-gray-300 text-md">
              {cardContents.map(({ value, icon: Icon, label }, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <p className="text-md text-white/70">{label}:</p>
                  <p className="text-md text-white/50">{value}</p>
                </div>
              ))}
            </div>

            {/* Ticket Footer */}
            <div className="mt-6 flex justify-center">
              <Button className="bg-yellow-500 text-gray-900 hover:bg-yellow-600">
                Download Ticket
              </Button>
            </div>
          </CardContent>
        </Card>
  )
}

export default TicketDetails