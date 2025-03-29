"use client"

import { Button } from "@/components/ui/button"
import { CarModel } from "@/lib/types";
import axios from "axios";
import { useActionState, useEffect, useState } from "react";
import { bookforRental } from "../../../actions/action";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const CarInformation =   () => {
  const params = useParams();
  const [cars,setCar] = useState<CarModel>()
  const [state,rentalBookingAction] = useActionState(bookforRental,{
    success:false,
    error:null,
    message:null,
  });


  

  useEffect(()=>{
    async  function FetchData(){
    const data : CarModel= await (await axios.get(`/api/getCarInformation/${params.id}`)).data
    setCar(data);
  }
  FetchData();
  },[params])

  useEffect(()=>{
    if(state.success){
      toast.success("Your request has been applied to the ownner")
    }else if(!state.success){
      toast.error("Failed to apply for rental!");
    }
  },[state])
  console.log("car:",cars);
  return (
    <section>
        <div className="flex flex-row justify-start items-start gap-10">

        {/* Car Image Here */}
        <div className="md:w-[800px] h-[400px] flex">
          <div className="w-full h-full bg-green-200">
          </div>
        </div>

        {/* Car Information */}
        <div className="flex-1">
          <div className="flex flex-col justify-center items-center">

            {/* Brand */}
            <div className="flex flex-col">
              <h1>Honda</h1>
            </div>


              
            {/* Other Information Related to Car As well */}
          </div>

          <form action={rentalBookingAction}>
            <p>Brand : {cars?.brand}</p>
            <Button type="submit">
              Book Now
            </Button>

          </form>
        </div>

        </div>
    </section>
  )
}

export default CarInformation