import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(){
  
  try{
    const cars = await prisma.car_model.findMany({
      orderBy: {
        pricePerDay:"desc"
      },
      take: 5, // Limit to top 10 most rented cars
      select:{
        id:true,
        brand:true,
        pricePerDay:true,
      }
    });
    return NextResponse.json(cars);

  }catch(error){
    console.log(error);
    return NextResponse.json({
      message:"Failed to Fetch the data",
    },
    {
      status:500
    }
  )
  }
}