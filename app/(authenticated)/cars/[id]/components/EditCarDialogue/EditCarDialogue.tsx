import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CarModel } from "@/lib/types"
import axios from "axios"
import { Edit } from "lucide-react"
import { useParams } from "next/navigation"
import { useActionState, useEffect, useState } from "react"
import { UpdateCar } from "./action"
import { toast } from "sonner"


const EditCarDialogue = () => {
  const params = useParams();
  const [car,setCar] = useState<CarModel>();
  const [state,updateCarAction] = useActionState(UpdateCar,{
    success:false,
    error:null,
    message:null,
  });


  if(state.success){
    toast.success("Car has been updated!");
  }
  useEffect(()=>{
    async function FetchData(){
      const {data} = await axios.get(`/api/getCarInformation/${params.id}`)
      if(data) return setCar(data);
    }
    FetchData();
  },[params]);

  console.log("Data From Dialogue Box", car);
  return (
    
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"}>
            <Edit className="w-4 h-4" />
                <p className="text-md">Edit</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Your Car</DialogTitle>
          <DialogDescription>
            Make changes to your car here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={updateCarAction}>
          <div className="grid gap-4 py-4">
            {/* Car Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Car Name
              </Label>
              <Input
                name="brand"
                defaultValue={car?.brand}
                className="col-span-3"
              />
            </div>

            {/* Mileage */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Mileage
              </Label>
              <Input
                name="mileage"
                defaultValue={car?.mileage}
                className="col-span-3"
              />
            </div>


            {/* Seats */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                No of Seats
              </Label>
              <Input
                id="seats"
                defaultValue={car?.no_seats}
                className="col-span-3"
              />
            </div>

            {/* Transmission */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Transmission
              </Label>
              <Input
                name="transmission"
                defaultValue={car?.transmission}
                className="col-span-3"
              />
            </div>

              {/* Pricing */}
              <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Pricing
              </Label>
              <Input
                name="pricing"
                defaultValue={String(car?.pricePerDay)}
                className="col-span-3"
              />
            </div>

            
              {/* Manufacture Date */}
              <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                MFD Date
              </Label>
              <Input
              type="number"
              name="mfd-date"
              defaultValue={car?.year}
              className="col-span-3"
              />
            </div>

            <Input name="carId" defaultValue={car?.id}/>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
      </Dialog>

  )
}

export default EditCarDialogue