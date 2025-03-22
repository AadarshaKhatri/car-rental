/*
  Warnings:

  - You are about to drop the column `model` on the `car_model` table. All the data in the column will be lost.
  - Added the required column `no_sets` to the `car_model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `car_model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmission` to the `car_model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car_model" DROP COLUMN "model",
ADD COLUMN     "no_sets" INTEGER NOT NULL,
ADD COLUMN     "postId" TEXT NOT NULL,
ADD COLUMN     "transmission" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "car_model" ADD CONSTRAINT "car_model_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
