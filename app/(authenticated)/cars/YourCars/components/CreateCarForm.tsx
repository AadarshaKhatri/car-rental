"use client"

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
import { useActionState, useState, useEffect } from "react";
import { createCars } from "../../actions/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ImageUploader } from "../../AllCars/components/ImageUploader";


const CreateCarForm = () => {
  const router = useRouter();
  const [transmission, setTransmission] = useState<string>("");
  const [state, CreateCarsAction] = useActionState(createCars, {
    success:false,
    message:null,
    error:null,
    error_msg:{
      brand:[],
      MFD_Date:[],
      mileage:[],
      pricePerDay:[],
      Seats:[],
      transmission:[],
      status:[]
    }
  });
  useEffect(() => {
    if (state?.success) {
      toast.success("Car Created!")
      setTransmission("")
     
      router.refresh()
    } else if (state?.error_msg) {
      Object.entries(state.error_msg).forEach(([key,value]) => {
        if(key) return null
        toast.error(`${value}`);
      });
    }
  }, [state,router]);

  return (
    <section>
      <div className="flex flex-col justify-center items-center gap-y-8">
        <form
          action={CreateCarsAction}
          className="w-full flex flex-col justify-center items-center gap-y-6"
        >
          <Input name="brand" type="text" placeholder="Brand of the car" className="w-full py-6" />
          <div className="flex flex-col md:flex-row w-full justify-center items-center gap-5">
            <Input name="mfd_date" type="number" placeholder="MFD Date" className="w-full py-6" />
            <Input name="mileage" type="text" placeholder="Mileage" className="w-full py-6" />
            <Input name="pricing" type="number" placeholder="Pricing" className="w-full py-6" />
          </div>
          <Input name="no_seats" type="number" placeholder="Number of Seats" className="w-full py-6" />

         



          {/* Input for the status of the car */}
          <Select onValueChange={(value) => setTransmission(value)} required>
            <SelectTrigger className="w-full py-6 bg-gray-800 text-white border border-muted rounded-md">
              <SelectValue placeholder="Select Transmission Type" />
            </SelectTrigger>
            <SelectContent className="w-full bg-gray-900 border border-muted rounded-md shadow-lg">
              <SelectGroup>
                <SelectItem value="Manual" className="px-6 py-2 cursor-pointer hover:bg-gray-100">
                  Manual
                </SelectItem>
                <SelectItem value="Auto" className="px-6 py-2 cursor-pointer hover:bg-gray-100">
                  Auto
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Hidden Input to store transmission value */}
          <Input type="text" className="hidden" value={transmission} name="transmission" readOnly />

          <ImageUploader />
         
          <Button>Create Car</Button>
        </form>
      </div>
    </section>
  );
};

export default CreateCarForm;
