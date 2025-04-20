"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useState } from "react";
import { createRentals } from "../../actions/action";
import { CarModel } from "@/lib/types";
import axios from "axios"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RentCarForm = () => {
  const router = useRouter()
  const [avaliableCars, setAvailableCars] = useState<CarModel []>();
  const [carID,setCarId] = useState<string>("");
  const [status,setStatus] = useState<string>("");
  const [state,createRentalAction] = useActionState(createRentals, {
    success:false,
    error:null,
    message:null,
  });

  
  useEffect(()=>{
    async function FetchData(){
      const data : CarModel [] = await (await axios.get("/api/getAvailableCars")).data
      console.log(data);
      if(!data){
        return null
      }
     setAvailableCars(data)
    }
    FetchData();
  },[])

  useEffect(()=>{
    if(state?.success){
      toast.success("Renal Car Added!")
      setAvailableCars([]);
      setStatus("");
      router.refresh();
      }else if (!state?.success && state?.error) {
        toast.error("Failed to make your car available for rental!")
        setAvailableCars([]);
      }
  },[state,router])
  return (
    <section>
    <div className="flex flex-col justify-center items-center gap-y-8">
      <form
        action={createRentalAction}
        className="w-full flex flex-col justify-center items-center gap-y-6"
      >
        <label>By doing this you are making your car availabel for rental</label>
        
        <Select onValueChange={(value) => setCarId(value)} required>
          <SelectTrigger className="w-full py-6 bg-gray-800 text-white border border-muted rounded-md">
            <SelectValue placeholder="Your Cars" />
          </SelectTrigger>
          <SelectContent className="w-full bg-gray-900 border border-muted rounded-md shadow-lg">
            <SelectGroup>
         {
          avaliableCars?.map((avaliableCar,index)=>(
            <SelectItem key={index} value={avaliableCar.id} className="px-6 py-2 cursor-pointer hover:bg-gray-100">
                {avaliableCar.brand}
              </SelectItem>
          ))
         }
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Hidden Input to store transmission value */}
        <Input type="text" className="hidden" value={carID} name="carId" readOnly/>

         <div className="w-full flex flex-col md:flex-row gap-5 justify-between items-center">
          <label className="w-full flex flex-col gap-2">
          <span className="text-gray-300">Start Date</span>
          <Input name="startDate" type="date" className="w-full py-6 flex justify-between"/>
        </label>

        <label className="w-full flex flex-col gap-2">
          <span className="text-gray-300">End Date</span>
          <Input name="endDate" type="date" className="w-full  py-6 flex justify-between"/>
        </label>
         </div>

         <Select onValueChange={(value) => setStatus(value)} required>
            <SelectTrigger className="w-full py-6 bg-gray-800 text-white border border-muted rounded-md">
              <SelectValue placeholder="Select the Availability of the Car" />
            </SelectTrigger>
            <SelectContent className="w-full bg-gray-900 border border-muted rounded-md shadow-lg">
              <SelectGroup>
                <SelectItem value="Available" className="px-6 py-2 cursor-pointer hover:bg-gray-100">
                  Available
                </SelectItem>
                <SelectItem value="Not Available" className="px-6 py-2 cursor-pointer hover:bg-gray-100">
                 Not Available
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Hidden Input to store transmission value */}
          <Input type="text" className="hidden" value={status} name="status" readOnly />
        <Button>Create Rental</Button>
      </form>
    </div>
  </section>
  )
}

export default RentCarForm