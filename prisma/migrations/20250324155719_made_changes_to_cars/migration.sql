-- DropForeignKey
ALTER TABLE "car_model" DROP CONSTRAINT "car_model_postId_fkey";

-- AlterTable
ALTER TABLE "car_model" ALTER COLUMN "postId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "car_model" ADD CONSTRAINT "car_model_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post_model"("id") ON DELETE SET NULL ON UPDATE CASCADE;
