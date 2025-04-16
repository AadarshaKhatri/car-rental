import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){
  console.log("API Most Rented Car Hit!")  
  try{
    const cars = await prisma.car_model.findMany({
      orderBy: {
        rentals: {
          _count: 'desc', // Count the number of related rentals for each car and sort in descending order
        },
      },
      take: 5, // Limit to top 10 most rented cars
      include: {
        rentals: true, // Include rental data if needed
      },
    });

    console.log("Rentals Count:",cars);
    return NextResponse.json(cars);
  }catch(error){
    console.log(error);
    return null
  }
}