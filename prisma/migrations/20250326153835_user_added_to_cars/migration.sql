/*
  Warnings:

  - The values [REJECTED,COMPLETED] on the enum `RentalStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `userId` to the `car_model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RentalStatus_new" AS ENUM ('PENDING', 'APPROVED');
ALTER TABLE "rental_model" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "rental_model" ALTER COLUMN "status" TYPE "RentalStatus_new" USING ("status"::text::"RentalStatus_new");
ALTER TYPE "RentalStatus" RENAME TO "RentalStatus_old";
ALTER TYPE "RentalStatus_new" RENAME TO "RentalStatus";
DROP TYPE "RentalStatus_old";
ALTER TABLE "rental_model" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "car_model" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "car_model" ADD CONSTRAINT "car_model_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
