import { getUserId } from "@/app/(notauthenticated)/session"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";



export async function GET(){
  try{
    const user = await getUserId();
    if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });
    const data = await prisma.booking_model.findMany({
      where:{
        bookedUserID:user,
        rents:{
          status:"RENTED",
          appliedUsers:{
            every:{
              status:"APPROVED",
            }
          }
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
            imageUrl:true,
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
    return NextResponse.json(data);

  }catch{
    return NextResponse.json({
      message:"Failed to Fetch the data",
    },
    {
      status:500
    }
  )
  }
}