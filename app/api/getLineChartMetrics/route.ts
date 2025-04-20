import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const userId = await getUserId();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const data = await prisma.booking_model.findMany({
      where:{
        bookedUserID:userId
      },select: {
        createdAt: true,
      },
    });

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const sendingData = monthNames.map((month, index) => {
      const no_of_Booking = data.filter((booking) => booking.createdAt.getMonth() === index).length;
      return { month, no_of_Booking };
    });

    return NextResponse.json(sendingData);

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({message:"Internal Server Error"},{status:500});
  }
}
