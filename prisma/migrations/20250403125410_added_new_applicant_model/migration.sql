/*
  Warnings:

  - You are about to drop the column `status` on the `rental_model` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rental_model" DROP COLUMN "status";

-- CreateTable
CREATE TABLE "applied_users" (
    "id" TEXT NOT NULL,
    "rentalId" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "status" "RentalStatus" NOT NULL DEFAULT 'NOT_APPLIED',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "applied_users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "applied_users" ADD CONSTRAINT "applied_users_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "rental_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applied_users" ADD CONSTRAINT "applied_users_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "user_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
