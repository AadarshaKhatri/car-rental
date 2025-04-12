import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(){
  try{
    const userId = await getUserId();
    if(!userId) return NextResponse.json({message:"Unauthorized User"},{status:401});

    const data = await prisma.user_model.findUnique({
      where:{
        id:userId
      }
    })
    return NextResponse.json(data);
  }catch(error){
    console.log(error);
    return null
  }
}