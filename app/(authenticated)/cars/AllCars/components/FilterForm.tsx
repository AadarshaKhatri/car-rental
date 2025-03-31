"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Delete } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { acceptBooking } from "../../actions/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";


interface Rent {
  id:string
  startDate: string;
  endDate: string;
  status: "PENDING" | "APPROVED" | "NOT_APPROVED"; // You can add other statuses as needed
}

interface Car {
  brand: string;
  pricePerDay: number;
}

interface BookedUser {
  name: string;
  id: string;
}

interface RentalData {
  id:string
  cars: Car;
  booked_user: BookedUser;
  rents: Rent;
}

export function RentRequest() {
  const router = useRouter();
  const [bookings, setBooking] = useState <RentalData []>([]); // Initialize as an empty array

  const [state, acceptBookingAction] = useActionState(acceptBooking, {
    success: false,
    error: null,
    message: null,
  });

  // Fetch data for pending bookings
  useEffect(() => {
    async function FetchData() {
        const { data  }  = await axios.get("/api/getPendingRentalReq");
        console.log(data);
        if (data) {
          setBooking(data); // Set the bookings state with fetched data
        }
    }
    FetchData();
  }, []);

  // Handle the booking approval or rejection
  useEffect(() => {
    if (state.success) {
      toast.success("Successfully Approved the Request!");
      router.push("/cars")
      router.refresh();
    }
  }, [state, router]);

  const handleAction = async (status: string, rentalId: string) => {
    startTransition(() => {
      const formData = new FormData();
      formData.append("status", status); // Add status to formData
      formData.append("rentalId", rentalId); // Add rentalId to formData
      acceptBookingAction(formData); // Send formData with status and rentalId
    });
  };

  return (
    <section className="w-full flex flex-row justify-center items-center gap-5">
      <div className="w-full flex flex-col justify-center items-center">
        {bookings.length === 0 ? (
          null
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <div>
              <h2 className="text-lg font-semibold pb-4">Pending Requests for Your Car!</h2>
            </div>
            <div className="w-full overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="text-left border-muted">
                    <TableHead className="table-padding">ID</TableHead>
                    <TableHead className="table-padding">Car Name</TableHead>
                    <TableHead className="table-padding">Start Date</TableHead>
                    <TableHead className="table-padding">End Date</TableHead>
                    <TableHead className="table-padding">Booked By</TableHead>
                    <TableHead className="table-padding">Status</TableHead>
                    <TableHead className="table-padding">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking,index) => (
                    <TableRow key={index} className="border-b transition">
                      <TableCell className="table-padding font-medium">{index+1}</TableCell>
                      <TableCell className="table-padding">{booking.cars.brand}</TableCell>
                      <TableCell className="table-padding">{booking.rents.startDate}</TableCell>
                      <TableCell className="table-padding">{booking.rents.endDate}</TableCell>
                      <TableCell className="table-padding">{booking.booked_user.name}</TableCell>
                      <TableCell className="table-padding">{booking.rents.status}</TableCell>

                      <TableCell className="table-padding flex gap-3">
                      

                        <Button
                          onClick={() => handleAction("Not_Approved",booking.rents.id)}
                          className="text-white bg-red-400 hover:bg-red-500/50"
                        >
                          <Delete />
                        </Button>

                        <Button
                          onClick={() => handleAction("Approved", booking.rents.id)}
                          className="text-white bg-green-400 hover:bg-green-500/50"
                        >
                          <Check />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
           </div>
        )}

      </div>
    </section>
  );
}
