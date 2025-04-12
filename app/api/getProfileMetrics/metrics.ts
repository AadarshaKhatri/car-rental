"use server"

import { getUserId } from "@/app/(notauthenticated)/session";
import prisma from "@/lib/prisma";


export default async function Metrics(){
  console.log("Metrics Hit!");
  try{
  const userId = await getUserId();
  const now = new Date();
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  if(!userId) return {message:"Not Authorized"}

  //======================For Cars =========================
  const TotalCars = await prisma.car_model.count({
    where:{
      authorId:String(userId),
    }
  })

  const TotalAvailableCars = await prisma.car_model.count({
    where:{
      authorId:String(userId),
      rentals:{
        some:{
          status:"AVAILABLE",
        }
      }
    }
  })

  //====================For Ongoing Rentals=====================
  const TotalRentals = await prisma.rental_model.count({
    where:{
      authorId:String(userId),
    }
  })
  const OngoingRentals = await prisma.rental_model.count({
    where:{
      authorId:String(userId),
      status:"RENTED",
    }
  })


  //======================= Booking This Month =======================


  const bookingsThisMonth = await prisma.booking_model.count({
    where: {
      createdAt:{
        gte:startOfThisMonth
      }
    }
  })

  const bookingPreviousMonth = await prisma.booking_model.count({
    where:{
      createdAt:{
        gte:startOfLastMonth,
        lt:startOfThisMonth
      }
    }
  })

  const percentage_change = bookingPreviousMonth !== 0
  ? ((bookingsThisMonth - bookingPreviousMonth) / bookingPreviousMonth) * 100
  : 0; 




  //==================== Revenue This month =====================
    const rentals = await prisma.rental_model.findMany({
      where: {
        endDate:{
          lt:startOfThisMonth,
          gte:startOfLastMonth,
        },
      },
      include: {
        car: true
      }
    })
  
    const totalRevenue = rentals.reduce((sum, rental) => {
      const days =
        (new Date(rental.endDate).getTime() -
          new Date(rental.startDate).getTime()) /
        (1000 * 60 * 60 * 24)
      return sum + rental.car.pricePerDay * days
    }, 0)

    const averageRevenuePerRental = rentals.length
    ? totalRevenue / rentals.length
    : 0;

  console.log("Cars:",TotalCars);
    
  return {TotalCars, TotalAvailableCars,TotalRentals,OngoingRentals,bookingsThisMonth,percentage_change,totalRevenue,averageRevenuePerRental}
  }
  catch(error){
    console.log(error);
    return {}
  }
}