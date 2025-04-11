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
    
    const data = await prisma.rental_model.findMany({
      where:{
        carId:carId,
      },
      include:{
        author:{
          select:{
            name:true,
            id:true,
          }
        },
        bookedBy:{
          select:{
            booked_user:{
              select:{
                id:true,
                name:true,
              }
            }
          }
        },
        car:true,
        appliedUsers:{
          select:{
            status:true,
            applicant:{
              select:{
                name:true,
                id:true,
              }
            }
          }
        }
      }
    })
    console.log("Booking Info",data);
    return NextResponse.json(data);
  }catch(error){
    console.log("Error while fetching",error);
    return null
  }
}