-- AlterTable
ALTER TABLE "user_model" ADD COLUMN     "pfp" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
