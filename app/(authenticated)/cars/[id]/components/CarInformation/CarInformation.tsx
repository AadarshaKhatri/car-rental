"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { Armchair, Calendar, Car, Fuel, KeySquare, User } from "lucide-react";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { bookforRental } from "../../../actions/action";
import { Input } from "@/components/ui/input";
import { CarModel } from "@/lib/types";
import { toast } from "sonner";

interface Booking {
  booked_user: {
    name: string;
  };
}

interface Rental {
  id:string,
  endDate: string; // You can convert this to Date if needed
  startDate: string; // You can convert this to Date if needed
  status: string;
}

interface CarInformationTypes extends CarModel { 
  booking: Booking [],
  rentals: Rental []
}

const CarInformation = () => {
  const params = useParams();
  const [cars, setCars] = useState<CarInformationTypes>();
  const [selectedRentalId, setSelectedRentalId] = useState<string >("");
  const [state, requestBookingAction] =  useActionState(bookforRental,{
    success:false,
    error:null,
    message:null,
  });


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
  const handleTabSelect = (rentalId: string) => {
    setSelectedRentalId(rentalId); // Store selected rental ID
  };
  if(state.success){
    toast.success("Request sent to the owner!")
  };
  return (
    <section className="w-full flex justify-center items-center pb-20">
      <div className="flex flex-col justify-center items-center">
        {/* Car Details */}
        <Card className="w-full rounded-lg border-0 md:px-20">
          <CardContent className="flex flex-col md:flex-row gap-16 p-6">
            <div className="w-[500px] h-auto bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Car Image Placeholder</span>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-semibold text-white">{cars?.brand}</h2>
                <div className="flex flex-row justify-center items-center gap-1">
                  <User />
                  <p className="text-sm text-gray-400">Requested By 3</p>
                </div>
              </div>

              <p className="text-gray-400 text-md">
                Experience the future of driving with the Tesla Model S, featuring cutting-edge technology and a high-performance electric drivetrain.
              </p>

              <div className="w-full flex flex-row justify items-center"> 
                <h4 className="text-md font-semibold w-full">Information related to car</h4>  
              </div>

              <div className="grid grid-cols-2 gap-3 text-gray-300 text-md">
              {
                    cardContents.map(({value,icon : Icon,label},index)=>(
                      <div key ={index} className="flex justify-start items-center gap-1">
                        <div className="flex flex-row justify-center items-center gap-3">
                            <Icon className="w-4 h-4 text-primary"/>  
                            <p className="text-md text-white/70">{label}:</p>

                        </div>
                        <p className="text-md text-white/50 ">{value}</p>
                      </div>
                    ))
                  }
              </div>

                      {/* Rent Selection Tabs */}
                  <div className="flex gap-4 mt-4">
                {cars?.rentals.map((rental) => (
                  <div
                    key={rental.id}
                    onClick={() => handleTabSelect(rental.id)}
                    className={`p-2 cursor-pointer rounded-md ${
                      selectedRentalId === rental.id
                        ? "bg-primary text-background"
                        : "bg-gray-900 text-white"
                    }`}
                  >
                    <p className="text-sm">
                      {`${new Date(rental.startDate).toLocaleDateString("en-GB", {
                           day: "2-digit",
                           month: "short",
                           year: "numeric",
                      })} - ${new Date(rental.endDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}`}
                    </p>
                  </div>
                ))}
                  </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-lg font-semibold text-white">Rs {cars?.pricePerDay}/per hour</p>
                  {/* Availability Tag */}
                  <div className="mt-4 w-20 px-3 py-2 bg-green-600 text-white text-sm rounded-md flex flex-row justify-center items-center">
                    <p className="text-center w-full text-background">{cars?.status}</p>
                  </div>
                </div>
                <form action={requestBookingAction}>
                  <Input name="carId" className="hidden" defaultValue={cars?.id}/>
                  <Input aria-required name="rentalId" className="hidden" defaultValue={selectedRentalId} />
                  <Button type="submit">Rent Now</Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Details (Updated) */}
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
      </div>
    </section>
  );
};

export default CarInformation;
