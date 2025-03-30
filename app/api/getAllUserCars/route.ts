import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){
  try{
    const user = await getUserId();
    const data = await prisma.car_model.findMany({
      where: {
        authorId: String(user),
      },
  
    });
    console.log(data)
     return NextResponse.json(data);
  }catch{
    console.log("Failed to Fetch the Cars");
    return null;
  }
}