import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){
  try{

    const user = await getUserId();
    if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });
    const data = await prisma.car_model.findMany({
      where: {
        authorId: String(user),
      },
  
    });
     return NextResponse.json(data);
  }catch{
    console.log("Failed to Fetch the Cars");
    return NextResponse.json({
      message:"Failed to Fetch the data",
    },
    {
      status:500
    }
  )
  }
}