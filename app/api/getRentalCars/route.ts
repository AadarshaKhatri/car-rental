import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET (){
  try{
    const user = await getUserId();
    if(!user) return null
    const data = await prisma.car_model.findMany({
      include:{
        author:{
          select:{
            name:true,
          }
        }
      },
      where:{
       author:{
        id:{
          not:user
        }
       },
    
        status:"AVAILABLE",
      }
    })
    console.log(data);
    return NextResponse.json(data);
  }catch{
    console.log('Failed to fetch the data!')
    return null
  }
}