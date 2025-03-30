"use server";
import {  getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import { CarSchema } from "@/lib/schemas";
import { PrevState } from "@/lib/types";
import { revalidatePath } from "next/cache";



interface createCarState extends PrevState {
  error_msg?: {
    mileage?:string[]
    Seats?: string[];
    status?:string[],
    brand?: string[];
    MFD_Date?: string[];
    pricePerDay?: string[];
    transmission?: string[];
  } | undefined;
}

// ================ Server Action to Create Cars =========================
export async function createCars(prevState: createCarState, formData: FormData) : Promise<createCarState>{
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
          status:error.flatten().fieldErrors.status,
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
        status:formData.get("status") as string === "Available" ? "AVAILABLE" : "NOT_AVAILABLE",
        brand:formData.get("brand") as string,
        no_seats:Number(formData.get("no_seats") as string),
        pricePerDay:Number(formData.get("pricing") as string),
        transmission:formData.get("transmission") as string,
        year:Number(formData.get("mfd_date") as string),
        mileage:Number(formData.get("mileage") as string),
        author:{
          connect:{
            id:String(user)
          }
        }
      }
    });

    revalidatePath("/cars","page");
    
    return { success: true, message: "Car created successfully!", error: null};
  } catch (error) {
    console.error("Error occurred while creating car:")
    console.log(`${error}`)
    return {
      ...prevState,
      success: false,
      error: "An unexpected error occurred",
      message: `${error}`,
      error_msg: undefined,
    };
  }
}


export async function createRentals (prevState:PrevState,formData:FormData) : Promise<PrevState>{

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
        author:{
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
        status:"NOT_APPLIED",
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
export async function deleteCars(prevState: PrevState, formData : FormData) : Promise<PrevState>{
  console.log("Delete Data Hit!");
  console.log("Delete Form Data",formData);
  try{
    //Finding the reatnal for the car before deleting
    const carRental = await prisma.rental_model.findFirst({
      where:{
        carId:formData.get("carId") as string,
      },
      select:{
        id:true
      }
    })
    console.log(carRental);

    // Deleting both the rental and car at once
    if(carRental){
      await prisma.rental_model.delete({
        where:{
          id:carRental?.id,
        }
      })
    }
    await prisma.car_model.delete({
      where:{
        id:formData.get("carId") as string,
      }
    })
    revalidatePath("/cars");
    return {
      success:true,
      error:null,
      message:null,
    }
  
  }catch(error){
    console.log(`Error: ${error}`)
    return { 
      success:false,
      message:null,
      error:"Failed to delete the car"
    }
  }
}


export async function bookforRental(prevState:PrevState,formData:FormData) : Promise<PrevState> {
  console.log('Book Rental Hit!');
  console.log("Booking Rental Form Data:",formData);
  try{
    const user = await getUserId();
    if(!user){
      return {
        success:false,
        error:"No User Found!",
        message:null
      }
    }
    const carId = formData.get("carId") as string;
    if (!carId) {
      return {
        success: false,
        error: "Car ID is required!",
        message: null,
      };
    }

    const found_rental = await prisma.rental_model.findFirst({
      where: {
        carId: String(carId),
      },
    });
    if (!found_rental) {
      return {
        success: false,
        error: "Rental not found for the specified car!",
        message: null,
      };
    }

    if(found_rental.status==="PENDING"){
      return {
        success:false,
        error:"The Car is Already made available for rental",
        message:null,
      }
    }
    await prisma.$transaction([
       prisma.booking_model.create({
        data:{
          cars:{
            connect:{
              id:formData.get("carId") as string,
            }
          },
          booked_user:{
            connect:{
              id:user
            }
          },
          rents:{
            connect:{
              id:found_rental.id
            }
          }

        }
      }),
       prisma.rental_model.update({
        where:{
          id:String(found_rental.id)
        },
        data:{
          status:"PENDING",
        }
      })
    ])
    
    return { 
      success:true,
      error:null,
      message:"Your request for rental has been applied!"
    }

  }catch(error){
    console.log(`${error}`);
    console.log("Erorr from Book Rental: ",error);
    return {
      success:false,
      message:null,
      error:"Error from booking rental!"
    }
  }
}

