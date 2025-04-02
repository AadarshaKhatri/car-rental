import prisma from "@/lib/prisma";
import cron from "node-cron";
import { getUserId } from "../(notauthenticated)/session";

async function deleteExpiredRentals() {
  const now = new Date();
  const user = await getUserId();
  
  try {
    if (!user) return;

    // Find all expired rentals
    const expiredRentals = await prisma.rental_model.findMany({
      where: {
        endDate: { lt: now },
      },
      select: {
        id: true,
        carId: true, 
      },
    });

    if (expiredRentals.length === 0) return; 

    const carIds = expiredRentals.map((rental) => rental.carId);

    await prisma.rental_model.deleteMany({
      where: {
        id: { in: expiredRentals.map((rental) => rental.id) },
      },
    });

    await prisma.car_model.updateMany({
      where: {
        id: { in: carIds },
      },
      data: {
        status: "AVAILABLE",
      },
    });

  } catch (error) {
    console.error("Error deleting expired rentals:", error);
  }
}

// Schedule the cron job to run at midnight every day
cron.schedule("0 0 * * *", async () => {
  console.log("Running cron job to delete expired rentals...");
  await deleteExpiredRentals();
});
