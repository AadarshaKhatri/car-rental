"use server";
import {  getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import { CarSchema } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";
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

interface uploadFileResponse{
  fileUrl?:string
  success?:boolean,
  error?:string
  message?:string
}

// ================ Server Action to Create Cars =========================
export async function createCars(prevState: createCarState, formData: FormData) : Promise<createCarState>{
  console.log("Car Create Hit!");
  console.log("FormData",formData);
  try {
    const { success, error } = CarSchema.safeParse({
      no_seats: Number(formData.get("no_seats") as string),
      mileage: Number(formData.get("mileage") as string),
      brand: formData.get("brand") as string,
      MFD_Date: Number(formData.get("mfd_date") as string),
      transmission: formData.get("transmission") as string,
      pricePerDay: Number(formData.get("pricing") as string),
      
    });
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
  const {fileUrl} = await imageUploader(formData.get("image") as File);
  if(!fileUrl) return {
    success:false,
    message:null,
    error:"Faile to Upload the Image",
  }
   await prisma.car_model.create({
      data:{
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
        },
        imageUrl:fileUrl,
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
    await prisma.rental_model.create({
      data:{ 
        status:formData.get("status") as string === "Available" ? "AVAILABLE":"NOT_AVAILABLE",
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
        
      }
    });
    revalidatePath("/cars","page");
    return {
      success:true,
      message:"Rental Created!",
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
export async function deleteCars(prevState: PrevState, formData: FormData): Promise<PrevState> {
  console.log("Delete Data Hit!");
  console.log("Delete Form Data", formData);

  try {
    // Finding all rentals for the car before deleting
    const carRental = await prisma.rental_model.findMany({
      where: {
        carId: formData.get("carId") as string,
      },
      select: {
        id: true,
      },
    });

    const rentalIds = carRental.map((rental) => rental.id);


    if (rentalIds.length > 0) {
      // Deleting applied users first to prevent foreign key issues
      await prisma.applied_users.deleteMany({
        where: {
          rentalId: { in: rentalIds },
        },
      });

      // Now deleting rentals
      await prisma.rental_model.deleteMany({
        where: {
          id: { in: rentalIds },
        },
      });
    }

    const cars = await prisma.car_model.findUnique({
      where:{
        id:formData.get("carId") as string,
      }
    })
    if(cars?.imageUrl) {
      await deleteImages(cars?.imageUrl);
      console.log(await deleteImages(cars?.imageUrl))
    }
    await prisma.car_model.delete({
      where: {
        id: formData.get("carId") as string,
      },
    });

    revalidatePath("/cars")
    return {
      success: true,
      error: null,
      message: "Car and related data deleted successfully",
    };
  } catch (error) {
    console.log(`Error: ${error}`);
    return {
      success: false,
      message: null,
      error: "Failed to delete the car",
    };
  }
}


// ======================= Server Action to creat Bookings ==========================
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
    await prisma.$transaction([
      prisma.applied_users.create({
        data:{
          rentals:{
            connect:{
              id:formData.get("rentalId") as string,
            }
          },
          applicant:{
            connect:{
              id:user
            }
          },
          status:"PENDING"
        }
      }),
    ])

    revalidatePath("/cars")

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


// ======================= Server Action to Accept the Booking ==========================
export async function acceptBooking(prevState: PrevState, formData: FormData): Promise<PrevState> {
  console.log("Accept Booking Hit!");
  console.log("Accept Booking Form Data:", formData);

  try {
    const user = await getUserId();
    if (!user) return { success: false, error: "No User!", message: null };

    const status = formData.get("status") as string;

    if (status === "YES") {
      await prisma.$transaction([
        // Create booking record
        prisma.booking_model.create({
          data: {
            cars: {
              connect: { id: formData.get("carId") as string },
            },
            booked_user: {
              connect: { id: formData.get("userId") as string },
            },
            rents: {
              connect: { id: formData.get("rentalId") as string },
            },
          },
        }),

        // Update applied_users status to APPROVED
        prisma.applied_users.updateMany({
          where: {
            applicantId:formData.get("userId") as string,
            rentalId : formData.get("rentalId") as string,
          },
          data: {
            status:"APPROVED",
          },
        }),

        // Update car status to RENTED
        prisma.rental_model.update({
          where: {
            id: formData.get("rentalId") as string,
          },
          data: {
            status: "RENTED",
          },
        }),

        // Delete other pending applications for the same rental
        prisma.applied_users.deleteMany({
          where: {
            rentalId:formData.get("rentalId") as string,
            status: "PENDING",
            applicantId: {
              not: formData.get("userId") as string,
            },
          },
        }),
      ]);
      revalidatePath("/cars")
      return {
        success: true,
        error: null,
        message: "Booking Successfully Accepted!",
      };
    } else {
      // Rejecting booking: delete applied_user record
      await prisma.applied_users.deleteMany({
        where: {
          applicantId:formData.get("userId") as string,
          rentalId:formData.get("rentalId") as string,
        },
      });

      return {
        success: true,
        error: null,
        message: "Request Rejected",
      };
    }
  } catch (error) {
    console.log("Error", error);
    return {
      success: false,
      error: "Failed to accept the booking!",
      message: null,
    };
  }
}


export async function imageUploader(file:File) : Promise<uploadFileResponse>{
  console.log("Image Uploader!")
  try {
    if (!file) {
      return {
        success: false,
        error: "No file uploaded!",
      };
    }
    const fileName = `${Date.now()}_${file.name}`;

    // Upload to Supabase
    const { data, error } = await supabase.storage

      .from("images") // Ensure this bucket exists in Supabase
      .upload(`public/${fileName}`, file, {
        cacheControl: "3600",
        upsert: false,
        contentType:file.type
      });

    if (error) {
      console.log(`${error.message}`)
      return {
        message:error.message,
        success: false,
        error: `Failed to upload image`,
      };
    }

    // Get public URL
    const url = supabase.storage.from("images").getPublicUrl(data.path);
    console.log("Url here: ", data);
    if (!url) {
      return {
       
        success: false,
        error: "Error retrieving file URL",
      };
    }
    return {
      success: true,
      message: "File uploaded successfully!",
      fileUrl: url.data.publicUrl,
    };
  } catch (err) {
    return {
      success: false,
      message:`Error Message:${err}`,
      error: "Failed to upload file!",
    };
  }
}


export async function deleteImages(imageUrl: string) {
  try {
    // Ensure the image URL starts with the correct prefix and decode the URL
    const decodedImageUrl = decodeURIComponent(imageUrl);
    const imagePath = decodedImageUrl.split('/public/images/')[1];  // Extract the image path after /public/images/

    console.log("Decoded Image Url Being Deleted:", imagePath);

    // Log the image path to verify it's correct
    if (!imagePath) {
      return {
        success: false,
        error: "Invalid image URL",
        message: "Failed to extract a valid image path from the URL",
      };
    }

    // Try to remove the image from the storage bucket
    const { error,data } = await supabase.storage.from("images").remove([`${imagePath}`]);

    console.log(data);
    // Check if there is an error during the remove operation
    if (error) {
      return {
        success: false,
        error: error.message,
        message: `Failed to delete the image: ${error.message}`,
      };
    }

    // If data is returned, the image has been successfully deleted
    return {
      success: true,
      message: "Image deleted successfully",
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      message: `Error Message: ${err}`,
      error: "Error Deleting the Image",
    };
  }
}


