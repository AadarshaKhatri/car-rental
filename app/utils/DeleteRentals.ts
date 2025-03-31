import prisma from "@/lib/prisma";
import cron from "node-cron";
// Ensure Prisma is correctly set up

async function deleteExpiredRentals() {
  const now = new Date();
  try {
  await prisma.rental_model.deleteMany({
      where: {
          endDate: {
            lt: now, 
          }
      },
    });
  } catch {
    return null
  }
}

cron.schedule("0 0 * * *", async () => {
  await deleteExpiredRentals();
});
