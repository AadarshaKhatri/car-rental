"use server";
import {  getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import { CarSchema } from "@/lib/schemas";
import { PrevState } from "@/lib/types";
import { revalidatePath } from "next/cache";



interface createCarState extends PrevState {
  error_msg: {
    mileage?:string[]
    Seats?: string[];
    brand?: string[];
    MFD_Date?: string[];
    pricePerDay?: string[];
    transmission?: string[];
  } | undefined;
}

// ================ Server Action to Create Cars =========================
export async function createCars(prevState: createCarState, formData: FormData){
  console.log("Car Create Hit!");
  try {
    const { success, error } = CarSchema.safeParse({
      no_seats: Number(formData.get("no_seats") as string),
      mileage: Number(formData.get("mileage") as string),
      brand: formData.get("brand") as string,
      MFD_Date: Number(formData.get("mfd_date") as string),
      transmission: formData.get("transmission") as string,
      pricePerDay: Number(formData.get("pricing") as string),
      status:formData.get("status") as string,
    });
    console.log("Validation result:", success);
    console.log("Validation Errors",error) // Log validation result


    const user = await getUserId();
    if(!user){
      return { 
        success:false,
        error:"Failed to Find the User!",
        message:null,
      }
    }
    if (!success) {
      return {
        ...prevState, // Preserve previous state
        success: false,
        error: "Failed to Validate",
        message: null,
        error_msg: {
          mileage:error.flatten().fieldErrors.mileage,
          brand: error?.flatten().fieldErrors.brand,
          Seats: error?.flatten().fieldErrors.no_seats,
          pricePerDay: error?.flatten().fieldErrors.pricePerDay,
          transmission: error?.flatten().fieldErrors.transmission,
          MFD_Date: error?.flatten().fieldErrors.MFD_Date,
        },
      };
    }

   await prisma.car_model.create({
      data:{
    
        brand:formData.get("brand") as string,
        no_seats:Number(formData.get("no_seats") as string),
        pricePerDay:Number(formData.get("pricing") as string),
        transmission:formData.get("transmission") as string,
        year:Number(formData.get("mfd_date") as string),
        mileage:Number(formData.get("mileage") as string),
        user:{
          connect:{
            id:String(user)
          }
        }
      }
    });

    revalidatePath("/cars", "page");
    return { success: true, message: "Car created successfully!", error: null, error_msg:null};
  } catch (error) {
    console.error("Error occurred while creating car:")
    console.log(`${error}`)
    return {
      ...prevState,
      success: false,
      error: "An unexpected error occurred",
      message: error,
      error_msg: undefined,
    };
  }
}


export async function createRentals (prevState:PrevState,formData:FormData){

  console.log("Car Rental Hit")
  console.log("Rental Form Data:", formData);
  try{
    const user = await getUserId();
    if(!user){
      return { 
        success:false,
        error:"Failed to find the user",
        message:null,
      }
    }
    const newRental = await prisma.rental_model.create({
      data:{
        user:{
          connect:{
            id:String(user),
          }
        },
        car:{
          connect:{
            id:formData.get("carId") as string,
          }
        },
        startDate:new Date(`${formData.get("startDate") as string}T00:00:00`),
        endDate:new Date(`${formData.get("endDate") as string}T00:00:00`),
      }
    });
    console.log(newRental);
  revalidatePath("/cars","page");
    return {
      success:true,
      message:null,
      error:null,
    }
  }catch(error){
    console.log("Error while creating the car for rental",error);
    return{
      success:false,
      message:null,
      error:'Failed to create rental!'
    }
  }
}


// ======================= Server Action to Delete Cars ==========================
export async function deleteCars(prevState: PrevState, formData : FormData){
  console.log("Delete Data Hit!");
  console.log("Delete Form Data",formData);
  try{
    await prisma.car_model.delete({
      where:{
        id:formData.get("carId") as string,
      }
    })
    revalidatePath("/cars","page");
    return {
      success:true,
      error:null,
      message:null,
    }
  
  }catch(error){
    console.log(`${error}`)
    return { 
      success:false,
      message:null,
      error:"Failed to delete the car"
    }
  }
}

