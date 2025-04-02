/*
  Warnings:

  - You are about to drop the column `userId` on the `booking_model` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "booking_model" DROP CONSTRAINT "booking_model_carId_fkey";

-- DropForeignKey
ALTER TABLE "booking_model" DROP CONSTRAINT "booking_model_rentalId_fkey";

-- DropForeignKey
ALTER TABLE "booking_model" DROP CONSTRAINT "booking_model_userId_fkey";

-- AlterTable
ALTER TABLE "booking_model" DROP COLUMN "userId",
ADD COLUMN     "bookedUserID" TEXT,
ALTER COLUMN "rentalId" DROP NOT NULL,
ALTER COLUMN "carId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "booking_model" ADD CONSTRAINT "booking_model_bookedUserID_fkey" FOREIGN KEY ("bookedUserID") REFERENCES "user_model"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_model" ADD CONSTRAINT "booking_model_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "rental_model"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_model" ADD CONSTRAINT "booking_model_carId_fkey" FOREIGN KEY ("carId") REFERENCES "car_model"("id") ON DELETE SET NULL ON UPDATE CASCADE;
