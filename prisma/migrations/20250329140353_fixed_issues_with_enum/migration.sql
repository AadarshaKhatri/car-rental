-- CreateEnum
CREATE TYPE "CarStatus" AS ENUM ('AVAILABLE', 'RENTED', 'NOT_AVAILABLE');

-- CreateEnum
CREATE TYPE "RentalStatus" AS ENUM ('NOT_APPLIED', 'PENDING', 'APPROVED');

-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "user_model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRoles" NOT NULL DEFAULT 'USER',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_model" (
    "id" TEXT NOT NULL,
    "no_seats" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "transmission" TEXT NOT NULL,
    "pricePerDay" DOUBLE PRECISION NOT NULL,
    "mileage" INTEGER NOT NULL,
    "status" "CarStatus" NOT NULL DEFAULT 'AVAILABLE',
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "car_model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rental_model" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "RentalStatus" NOT NULL DEFAULT 'NOT_APPLIED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rental_model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_model" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rentalId" TEXT NOT NULL,
    "carId" TEXT NOT NULL,

    CONSTRAINT "booking_model_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_model_email_key" ON "user_model"("email");

-- AddForeignKey
ALTER TABLE "car_model" ADD CONSTRAINT "car_model_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_model" ADD CONSTRAINT "rental_model_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_model" ADD CONSTRAINT "rental_model_carId_fkey" FOREIGN KEY ("carId") REFERENCES "car_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_model" ADD CONSTRAINT "booking_model_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_model" ADD CONSTRAINT "booking_model_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "rental_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_model" ADD CONSTRAINT "booking_model_carId_fkey" FOREIGN KEY ("carId") REFERENCES "car_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
