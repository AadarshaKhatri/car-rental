/*
  Warnings:

  - The values [MAINTENANCE] on the enum `CarStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CarStatus_new" AS ENUM ('AVAILABLE', 'RENTED', 'NOT_AVAILABLE');
ALTER TABLE "car_model" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "car_model" ALTER COLUMN "status" TYPE "CarStatus_new" USING ("status"::text::"CarStatus_new");
ALTER TYPE "CarStatus" RENAME TO "CarStatus_old";
ALTER TYPE "CarStatus_new" RENAME TO "CarStatus";
DROP TYPE "CarStatus_old";
ALTER TABLE "car_model" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;
