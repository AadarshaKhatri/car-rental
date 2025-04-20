
import { NextResponse } from "next/server"
import Metrics from "./metrics";


export async function GET() {
  try {
    const {TotalCars, TotalAvailableCars,TotalRentals,OngoingRentals,bookingsThisMonth,percentage_change,totalRevenue,averageRevenuePerRental } = await Metrics();
    const data = [
      {
        title: "Total Cars", // This one can be static or come from analytics
        value: TotalCars,
        badge: `${TotalAvailableCars} available cars`,
        icon: "car",
        textColor: "text-green-600"
      },
      {
        title: "Total Rentals Created",
        value: TotalRentals,
        badge: `${OngoingRentals} ongoing rentals`,
        icon: "users",
        textColor: "text-blue-400"
      },
      {
        title: "Boookings This Month",
        value: bookingsThisMonth,
        badge: `+${percentage_change}% this month`,
        icon: "calendar-check",
        textColor: "text-yellow-400"
      },
      {
        title: "Total Revenue",
        value: `Rs ${totalRevenue}`,
        badge: `Average Rs ${averageRevenuePerRental} per rental`,
        icon: "eye",
        textColor: "text-purple-400"
      }
    ]

    return NextResponse.json(data);
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
