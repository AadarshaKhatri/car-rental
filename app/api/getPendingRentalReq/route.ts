import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";


export async function GET (){
  try{
    const user  = await getUserId();
    if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });
    const data = await prisma.applied_users.findMany({
      where:{
        status:"PENDING",
        rentals:{
          authorId:user
        }
      },
      select:{
        status:true,
        applicant:{
          select:{  
            name:true,
            id:true,
          }
        },
        rentals:{
          select:{
            id:true,
            startDate:true,
            endDate:true,
            car:{
              select:{
                brand:true,
                id:true,
              }
            },
          } 
        },

      }
    })

    return NextResponse.json(data);
  }catch(error){
    console.log("Error Fetching the data",error)
    return NextResponse.json({
      message:"Failed to Fetch the data",
    },
    {
      status:500
    }
  )
  }
}
