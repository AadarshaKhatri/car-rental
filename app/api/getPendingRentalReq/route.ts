import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";


export async function GET (){
  try{
    const user  = await getUserId();
    if(!user) return null
    const data = await prisma.booking_model.findMany({
      select:{
        cars:{
        select:{
          brand:true,
          pricePerDay:true,
        }
        },
        booked_user:{
          select:{
            name:true,
            id:true,
          }
        },
        rents:{
          select:{
            startDate:true,
            endDate:true,
            status:true,
            id:true,
          }
        }
      },

      where:{
        rents:{
          is:{
            status:"PENDING",
            authorId:user,
          }
        }
      },
    })

   

    return NextResponse.json(data);
  }catch(error){
    console.log("Error Fetching the data",error)
    return null
  }
}
