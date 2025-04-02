import { getUserId } from "@/app/(notauthenticated)/session"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";



export async function GET(){
  try{
    const user = await getUserId();
    if(!user) return null
    const data = await prisma.booking_model.findMany({
      where:{
        bookedUserID:user,
        cars:{
          status:"RENTED",
        },
        rents:{
          status:"APPROVED",
        }
      },
      include:{
        rents:{
          select:{
            startDate:true,
            endDate:true,
          }
        },
        cars:{
          select:{
            brand:true,
            mileage:true,
            pricePerDay:true,
            no_seats:true,
            transmission:true,
            year:true
          }
        },
      }
    });
    console.log(data);
    return NextResponse.json(data);

  }catch{
    return null
  }
}