-- AlterEnum
ALTER TYPE "RentalStatus" ADD VALUE 'NOT_FOR_RENT';

-- AlterTable
ALTER TABLE "rental_model" ALTER COLUMN "status" SET DEFAULT 'NOT_FOR_RENT';
