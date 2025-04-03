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

interface BookingData {
  cars: {
    id: string;
    brand: string;
    pricePerDay: number;
  } | null;

  rents: {
    id: string;
    startDate: Date;
    endDate: Date;
    appliedUsers: {
      id: string;
      status: string;
    }[];
  } | null;
}

export function RentRequest() {
  const router = useRouter();
  const [bookings, setBooking] = useState<BookingData[]>([]);

  const [state, acceptBookingAction] = useActionState(acceptBooking, {
    success: false,
    error: null,
    message: null,
  });

  useEffect(() => {
    async function FetchData() {
      const { data } = await axios.get("/api/getPendingRentalReq");
      setBooking(data || []);
    }
    FetchData();
  }, []);

  useEffect(() => {
    if (state.success) {
      toast.success("Action to the Request Success!");
      router.push("/cars");
      router.refresh();
    }
  }, [state, router]);

  const [status, setStatus] = useState<string>("");

  return (
    <section className="w-full flex flex-col justify-center items-center ">
      <h2 className="text-lg font-semibold pb-4">
        {bookings.length > 0 ? "Pending Requests for Your Car!" : "No Pending Requests for Your Car!"}
      </h2>

      <div className="w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="text-left border-muted">
              <TableHead className="table-padding">ID</TableHead>
              <TableHead className="table-padding">Car Name</TableHead>
              <TableHead className="table-padding">Start Date</TableHead>
              <TableHead className="table-padding">End Date</TableHead>
              <TableHead className="table-padding">Applied User</TableHead>
              <TableHead className="table-padding">Status</TableHead>
              <TableHead className="table-padding">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) =>
                booking.rents?.appliedUsers.map((user, userIndex) => (
                  <TableRow key={`${index}-${userIndex}`} className="border-b transition">
                    <TableCell className="table-padding">{index + 1}</TableCell>
                    <TableCell className="table-padding">{booking.cars?.brand}</TableCell>
                    <TableCell className="table-padding">
                      { booking.rents?.startDate ? new Date(booking.rents?.startDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }) : "N/A"}
                    </TableCell>
                    <TableCell className="table-padding">
                      {booking.rents?.endDate ? new Date(booking.rents?.endDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }) : "N/A"}
                    </TableCell>
                    <TableCell className="table-padding">{user.id}</TableCell>
                    <TableCell className="table-padding">{user.status}</TableCell>
                    <TableCell className="flex gap-3 table-padding">
                      <form action={acceptBookingAction} className="flex gap-4">
                        <Input type="hidden" defaultValue={booking.cars?.id} name="carId" />
                        <Input type="hidden" defaultValue={booking.rents?.id} name="rentalId" />
                        <Input type="hidden" defaultValue={user.id} name="userId" />
                        <Input type="hidden" defaultValue={status} name="status" />
                        <Button
                          type="submit"
                          onClick={() => setStatus("NO")}
                          className="text-white bg-red-400 hover:bg-red-500/50"
                        >
                          <Delete />
                        </Button>
                        <Button
                          type="submit"
                          onClick={() => setStatus("YES")}
                          className="text-white bg-green-400 hover:bg-green-500/50"
                        >
                          <Check />
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))
              )
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
