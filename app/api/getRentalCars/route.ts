import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await getUserId();

    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const cars = await prisma.car_model.findMany({
      where: {
        authorId: {
          not: userId, // Not posted by current user
        },
        rentals: {
          some: {
            status: "AVAILABLE", // At least one rental available
            appliedUsers: {
              every: {
                status: {
                  not: "APPROVED", // None are approved yet
                },
              },
            },
          },
        },
      },
      
      include: {
       _count:{
        select:{
          rentals:true,
        }
       },
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(cars);
  } catch (err) {
    console.error("Failed to fetch cars:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
