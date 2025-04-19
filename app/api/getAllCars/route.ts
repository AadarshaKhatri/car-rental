import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){
  try{
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await prisma.car_model.findMany({
      where:{
        authorId:{
          not:userId
        }
      },include:{
        author:{
          select:{
            name:true,
            id:true,
          }
        },
        _count:{
          select:{
            rentals:true,
          }
        }
      },

    });
    console.log("All Cars",data)
    return NextResponse.json(data);
  }catch(error){
    console.log(error);
    return null
  }
}