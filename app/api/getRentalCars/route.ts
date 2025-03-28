import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET (){
  try{
    const user = await getUserId();
    if(!user) return null
    const data = await prisma.car_model.findMany({
      include:{
        user:{
          select:{
            name:true,
          }
        }
      },
      where:{
       userId:{
        not:user
       },
    
        status:"AVAILABLE",
        rentals:{
          some:{
            status:"PENDING"
          }
        }
      }
    })
    console.log(data);
    return NextResponse.json(data);
  }catch{
    console.log('Failed to fetch the data!')
    return null
  }
}