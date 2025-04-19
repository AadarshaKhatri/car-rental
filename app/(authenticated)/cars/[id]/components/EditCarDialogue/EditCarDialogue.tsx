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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const EditCarDialogue = () => {
  const params = useParams();
  const [car,setCar] = useState<CarModel>();
  const [transmission, setTransmission] = useState<string>("");

  const [state,updateCarAction] = useActionState(UpdateCar,{
    success:false,
    error:null,
    message:null,
  });




  useEffect(()=>{
    async function FetchData(){
      const {data} = await axios.get(`/api/getCarInformation/${params.id}`)
      if(data) return setCar(data);
    }
    FetchData();
  },[params]);

  useEffect(()=>{
    if(state.success){
    toast.success(`${state.message}`)
    
    }
  },[state])

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
                name="seats"
                defaultValue={car?.no_seats}
                className="col-span-3"
              />
            </div>

            {/* Transmission */}
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="transmission" className="text-right">
                  Transmission
                </Label>
                <div className="col-span-3">
                  <Select
                  
                    onValueChange={(value) => setTransmission(value)}
                    defaultValue={car?.transmission}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Transmission Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Hidden input to submit transmission value */}
              <input type="hidden" name="transmission" value={transmission} readOnly />

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
              name="year"
              defaultValue={car?.year}
              className="col-span-3"
              />
            </div>

            <Input className="hidden" name="carId" defaultValue={car?.id}/>
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