import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const [not_available, available, rented] = await Promise.all([
      prisma.rental_model.count({ where: { authorId: userId, status: "NOT_AVAILABLE" } }),
      prisma.rental_model.count({ where: { authorId: userId, status: "AVAILABLE" } }),
      prisma.rental_model.count({ where: { authorId: userId, status: "RENTED" } }),
    ]);

    const data = [
      { name: "Not Available", value: not_available },
      { name: "Available", value: available },
      { name: "Rented", value: rented },
    ];

    return NextResponse.json(data);

  } catch (error) {
    console.error("API Error in getPieChart:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
