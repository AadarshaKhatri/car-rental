import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface BookingModel {
  cars: {
    pricePerDay: number | null;
    mileage: number | null;
  } | null;
}
export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return Response.json({ message: "Unauthorized" }, { status: 401 });


    const FindUserBooking = await prisma.booking_model.findMany({
      where: {
        bookedUserID: userId,
      },
      select: {
        cars: {
          select: {
            mileage: true,
            pricePerDay: true,
          },
        },
      },
    });

    if(FindUserBooking.length === 0){
      return NextResponse.json([]);
    }
    const { avgMileage, avgPrice, priceRange, mileageRange } = recommendationCalculator(FindUserBooking);

    const RecommendedCars = await prisma.car_model.findMany({
      where: {
        authorId: {
          not: userId, // Exclude cars owned by the current user
        },
        pricePerDay: {
          gte: avgPrice - priceRange, // Minimum price (avg - range)
          lte: avgPrice + priceRange, // Maximum price (avg + range)
        },
        mileage: {
          gte: avgMileage - mileageRange, // Minimum mileage (avg - range)
          lte: avgMileage + mileageRange, // Maximum mileage (avg + range)
        },
      },
      include: {
        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      take: 10, // Limit to top 10 results
    });

    if(FindUserBooking.length>5){
      return NextResponse.json(RecommendedCars);
    }

    return NextResponse.json([]);
  } catch (error) {
    console.log("Recommendation error:", error);
    return null
  }
}



function recommendationCalculator(FindUserBooking: BookingModel[]) {
  // Calculate pricingPerDay and Mileage arrays, filtering out undefined values
  const pricingPerDay = FindUserBooking
    .map((booking) => booking.cars?.pricePerDay)
    .filter((price): price is number => Boolean(price));

  const Mileage = FindUserBooking
    .map((booking) => booking.cars?.mileage)
    .filter((mileage): mileage is number => Boolean(mileage));

  // Return defaults if there are no valid bookings
  if (pricingPerDay.length === 0 || Mileage.length === 0) {
    return { avgPrice: 0, avgMileage: 0, priceRange: 0, mileageRange: 0 };
  }

  const avgPrice = pricingPerDay.reduce((a, b) => a + b, 0) / pricingPerDay.length;
  const avgMileage = Mileage.reduce((a, b) => a + b, 0) / Mileage.length;

  const priceRange = Math.max(...pricingPerDay) - Math.min(...pricingPerDay);
  const mileageRange = Math.max(...Mileage) - Math.min(...Mileage);

  return { avgMileage, avgPrice, priceRange, mileageRange };
}
