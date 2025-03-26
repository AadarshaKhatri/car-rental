import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {

  try{
    const data = await prisma.car_model.findMany({
      where:{
        status:"AVAILABLE",
      }
    })
    
    return NextResponse.json(data);

  }catch(error){
    console.log("Failed to fetch available cars",error);
    return NextResponse.next();
  }
  
}