import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("Car By Filter API Hit!");
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ message: "Not Authorized" });

    const UserCar = await prisma.car_model.findMany({
      where: {
        authorId: userId,
      },
      select: {
        year: true,
      },
    });

    // Grouping logic
    const groupedYears = {
      "1999–2005": 0,
      "2006–2010": 0,
      "2011–2015": 0,
      "2016–2020": 0,
      "2021–2025": 0,
    };

    UserCar.forEach(({ year }) => {
      if (year >= 1999 && year <= 2005) groupedYears["1999–2005"]++;
      else if (year >= 2006 && year <= 2010) groupedYears["2006–2010"]++;
      else if (year >= 2011 && year <= 2015) groupedYears["2011–2015"]++;
      else if (year >= 2016 && year <= 2020) groupedYears["2016–2020"]++;
      else if (year >= 2021 && year <= 2025) groupedYears["2021–2025"]++;
    });

    // Convert to array for graphing
    const data = Object.entries(groupedYears).map(([range, value]) => ({
      month: range,
      Total_Cars: value,
    }));

    console.log(data);
    return NextResponse.json(data);

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
