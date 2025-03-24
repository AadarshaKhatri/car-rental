/*
  Warnings:

  - You are about to drop the column `no_sets` on the `car_model` table. All the data in the column will be lost.
  - Added the required column `mileage` to the `car_model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_seats` to the `car_model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car_model" DROP COLUMN "no_sets",
ADD COLUMN     "mileage" INTEGER NOT NULL,
ADD COLUMN     "no_seats" INTEGER NOT NULL;
