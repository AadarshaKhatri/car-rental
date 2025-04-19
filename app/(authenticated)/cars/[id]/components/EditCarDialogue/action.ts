"use server";

import prisma from "@/lib/prisma";
import { PrevState } from "@/lib/types";
import { revalidatePath } from "next/cache";



export async function UpdateCar(prevState:PrevState, formData:FormData) : Promise<PrevState>{
  console.log("Update Car Hit");
  console.log("Update Car Form:",formData)
  try{
    await prisma.car_model.update({
      where:{
        id:formData.get("carId") as string,
      },
      data:{
        brand:formData.get("brand") as string,
        mileage:Number(formData.get("mileage") as string),
        transmission:formData.get("transmission") as string,
        pricePerDay:Number(formData.get("pricing") as string),
        year:Number(formData.get("year") as string),
        no_seats:Number(formData.get("seats") as string)
      }
    })
    revalidatePath("/cars/","layout");
    return{
      success:true,
      error:null,
      message:"Car Updated Successfully!"
    }

  }catch(error){
    console.log(error);
    return{
      success:false,
      error:"Failed to Update the Car",
      message:null
    }
  }

}