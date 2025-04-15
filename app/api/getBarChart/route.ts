import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
  try{
    const userId = await getUserId();
    if(!userId) return NextResponse.json({message:"Not Auhtorized"})
    
    const auto_car = await prisma.car_model.count({
      where:{
        authorId:userId,
        transmission:"Auto",
      }
    })

    const manual_car = await prisma.car_model.count({
      where:{
        authorId:userId,
        transmission:"Manual",
      }
    });
    const data = [
      {
        name:"Auto",
        value:auto_car
      },
      {
        name:"Manual",
        value:manual_car,
      }
    ]
    console.log("Bar Data",data);
    return NextResponse.json(data);
  }catch(error){
    console.log(error);
    return null;
  }

}