"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Delete } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { acceptBooking } from "../../actions/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";

interface CarModel {
  brand: string;
  id: string;
}

interface BookingData {
  status:string,
  applicant: {
    name: string;
    id: string;
  };
  rentals: {
    id: string;
    startDate: Date | null;
    endDate: Date | null;
    car: CarModel;
  };
}

export function RentRequest() {
  const router = useRouter();
  const [status,setStatus] = useState<string>(" ");
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [state,accpetBookingAction] = useActionState(acceptBooking,{
    success:false,
    error:null,
    message:null,
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/api/getPendingRentalReq");
        setBookings(data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    }
    fetchData();
  }, []);
  console.log(bookings)

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/cars");
      router.refresh();
    }
  }, [state, router]);

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold pb-4">
        {bookings.length > 0 ? "Pending Requests for Your Car!" : "No Pending Requests for Your Car!"}
      </h2>

      <div className="w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="text-left border-muted">
              <TableHead className="table-padding">ID</TableHead>
              <TableHead className="table-padding">Car Name</TableHead>
              <TableHead className="table-padding hidden md:table-cell">End Date</TableHead>
              <TableHead className="table-padding hidden md:table-cell">Start Date</TableHead>
              <TableHead className="table-padding">Applied User</TableHead>
              <TableHead className="table-padding hidden md:table-cell">Status</TableHead>
              <TableHead className="table-padding">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => {
                return (
                  <TableRow key={index} className="border-b transition">
                    <TableCell className="table-padding">{index + 1}</TableCell>
                    <TableCell className="table-padding">{booking.rentals.car.brand ? booking.rentals.car.brand : "N/A"}</TableCell>
                    <TableCell className="table-padding hidden md:table-cell">
                      {booking.rentals.startDate
                        ? new Date(booking.rentals.startDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </TableCell>
                    <TableCell className="table-padding hidden md:table-cell">
                      {booking.rentals.endDate
                        ? new Date(booking.rentals.endDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </TableCell>
                    <TableCell className="table-padding">{booking.applicant.name}</TableCell>
                    <TableCell className="table-padding hidden md:table-cell">{booking.status}</TableCell>
                    <TableCell className="flex gap-3 table-padding">
                      <form action={accpetBookingAction} className="flex gap-4">
                        <Input type="hidden" name="carId" defaultValue={booking.rentals.car.id} />
                        <Input type="hidden" name="rentalId" defaultValue={booking.rentals.id} />
                        <Input type="hidden" name="userId" defaultValue={booking.applicant.id} />
                        <Input type="hidden" name="status" defaultValue={status} />
                        <Button
                        onClick={()=>setStatus("NO")}
                          type="submit"
                          className="text-white bg-red-400 hover:bg-red-500/50"
                        >
                          <Delete />
                        </Button>
                        <Button
                        onClick={()=>setStatus("YES")}
                          type="submit"
                          className="text-white bg-green-400 hover:bg-green-500/50"
                        >
                          <Check />
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No pending requests available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
