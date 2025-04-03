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
          id:true,
          brand:true,
          pricePerDay:true,
        }
        },
        rents:{
          select:{
            startDate:true,
            endDate:true,
            id:true,
            appliedUsers:{
              select:{
                status:true,
                id:true,
              }
            }
          }
        }
      },

      where:{
        rents:{
          is:{
            authorId:user,
          }
        }
      },
    })

   
    console.log(data);
    return NextResponse.json(data);
  }catch(error){
    console.log("Error Fetching the data",error)
    return null
  }
}
