import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import {  NextResponse } from "next/server";


export async function GET (  request: Request,
  { params }: { params: Promise<{ carId: string }> }){
  try{
    const userId = await getUserId();
    if (!userId) return Response.json({ message: "Unauthorized" }, { status: 401 });
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
          select:{
            id:true,
            startDate:true,
            endDate:true,
            status:true,
            appliedUsers:{
              select:{
                applicantId:true,
                status:true,

              }
            },
          }
        },
        author:{
          select:{
            name:true,
            id:true,
          }
        }
        
      }
    })
    console.log(data);
    return NextResponse.json(data);
  }catch(error){
    console.log("Error while fetching",error);
    return null
  }
}