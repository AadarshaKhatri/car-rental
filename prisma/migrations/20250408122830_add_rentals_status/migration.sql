/*
  Warnings:

  - You are about to drop the column `status` on the `car_model` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "car_model" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "rental_model" ADD COLUMN     "status" "CarStatus" NOT NULL DEFAULT 'AVAILABLE';
