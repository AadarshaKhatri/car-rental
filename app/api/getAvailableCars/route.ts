import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {

  try{
    const user = await getUserId();
    if(!user) return null
    const data = await prisma.car_model.findMany({
      where:{
        authorId:user,
        
      },
    })
    return NextResponse.json(data);
  }catch(error){
    console.log("Failed to fetch available cars",error);
    return NextResponse.next();
  }
}