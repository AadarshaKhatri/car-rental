"use server";

import { PrevState } from "@/lib/types";



export async function UpdateCar(prevState:PrevState, formData:FormData) : Promise<PrevState>{
  console.log("Update Car Hit");
  console.log("Update Car Form:",formData)
  try{
    return{
      success:true,
      error:null,
      message:"Car Updated Successfully"
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