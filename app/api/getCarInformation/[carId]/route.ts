import prisma from "@/lib/prisma";
import {  NextResponse } from "next/server";


export async function GET (  request: Request,
  { params }: { params: Promise<{ carId: string }> }){
  try{
  const {carId} = await params;
    
    if(!carId){
     return NextResponse.json({error:"Car Id not found!"});
    }
    
    const data = await prisma.car_model.findUnique({
      where:{
        id:carId,
        rentals:{
          every:{
            carId:carId,
          }
        }
      },
      include:{
        rentals:{
          include:{
            appliedUsers:true,
          }
        },
        
      }
    })
    console.log(data);
    return NextResponse.json(data);
  }catch(error){
    console.log("Error while fetching",error);
    return null
  }
}