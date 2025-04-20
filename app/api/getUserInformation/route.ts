import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(){
  try{
    const userId = await getUserId();
    if (!userId) return Response.json({ message: "Unauthorized" }, { status: 401 });
    const data = await prisma.user_model.findUnique({
      where:{
        id:userId
      }
    })
    return NextResponse.json(data);
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