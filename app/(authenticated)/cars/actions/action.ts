"use server";
import prisma from "@/lib/prisma";
import { CarSchema } from "@/lib/schemas";
import { PrevState } from "@/lib/types";



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
    
    const new_car = await prisma.car_model.create({
      data:{
        brand:formData.get("brand") as string,
        no_seats:Number(formData.get("no_seats") as string),
        pricePerDay:Number(formData.get("pricing") as string),
        transmission:formData.get("transmission") as string,
        year:Number(formData.get("mfd_date") as string),
        mileage:Number(formData.get("mileage") as string),
      }
    });

    console.log("Car created:", new_car); // Log the created car
    return {
      ...prevState,
      success: true,
      error: null,
      message: "Car created successfully",
      error_msg: undefined,
    };
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


// ======================= Server Action to Delete Cars ==========================
export async function deleteCars(){
  try{

  }catch(error){
    console.log(`${error}`)
  }
}

