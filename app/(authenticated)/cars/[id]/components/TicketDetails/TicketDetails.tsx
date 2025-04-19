"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CarModel, RentalModel } from "@/lib/types";
import axios from "axios";
import { Armchair, Bell, Calendar, Car, Fuel, KeySquare, User } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// --- Interfaces ---
interface AppliedUser {
  status:string,
  applicant: {
    name: string;
    id:string,
  };
}

interface BookedByUser {
  booked_user: {
    name: string;
    id: string;
  };
}
interface Author{
  name:string,
  id:string,
}

interface TicketDetailsTypes extends RentalModel {
  appliedUsers: AppliedUser[];
  car: CarModel;
  author: Author
  bookedBy: BookedByUser[]; // Updated: now reflects the array structure
}

const TicketDetails = ({ id }: { id: string }) => {
  const params = useParams();
  const [tickets, setTickets] = useState<TicketDetailsTypes[]>();

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/getBookingInformation/${params.id}`);
      setTickets(data);
    }
    fetchData();
  }, [params]);

  return (
    <div className="w-full">
      {tickets?.map((ticket, index) => {
        if (ticket.status !== "RENTED") return null;

        const bookedUser = ticket.bookedBy?.[0]?.booked_user;
        const isOwner = ticket.authorId === id;
        const isRenter = bookedUser?.id === id;

        if (!isOwner && !isRenter) return null;

    

        const startDate = new Date(ticket.startDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const endDate = new Date(ticket.endDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return (
          <Card
          key={index}
          className="w-full rounded-xl border border-gray-800 text-white px-10 mt-6 relative"
        >
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <Car className="text-primary w-8 h-8" />
              <h2 className="text-2xl font-bold text-primary">
                {isOwner ? "Your Car's Booking Information" : "Booking Information"}
              </h2>
            </div>
        
            <div className="border-t border-dashed border-gray-600 my-6" />
        
            {/* Booking Information */}
            <h3 className="text-lg font-semibold text-white mb-4">Booking Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-300 font-semibold">
                  <KeySquare className="w-4 h-4 text-primary" />
                  <p>Booked By:</p>
                </div>
                <p className="text-md text-white font-semibold">
                  {ticket.bookedBy.length !== 0 ? bookedUser?.name : "Not Booked"}
                </p>
              </div>
        
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-300 font-semibold">
                  <Car className="w-4 h-4 text-primary" />
                  <p>Car Name:</p>
                </div>
                <p className="text-md text-white font-semibold">{ticket.car.brand}</p>
              </div>
        
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-300 font-semibold">
                  <User className="w-4 h-4 text-primary" />
                  <p>Owner:</p>
                </div>
                <p className="text-md text-white font-semibold">{ticket.author.name}</p>
              </div>
     
        
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-300 font-semibold">
                  <Bell className="w-4 h-4 text-primary" />
                  <p>Status:</p>
                </div>
                <p className="text-md font-semibold text-green-500">
                  {ticket.appliedUsers.map((user) => user.status).join(", ")}
                </p>
              </div>
        
        
        
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-300 font-semibold">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <p>Start Date:</p>
                </div>
                <p className="text-md text-white font-semibold">{startDate}</p>
              </div>
        
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-300 font-semibold">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <p>End Date:</p>
                </div>
                <p className="text-md text-white font-semibold">{endDate}</p>
              </div>
            </div>
        
            <div className="border-t border-dashed border-gray-600 my-6" />
        
            {/* Car Information */}
            <h3 className="text-lg font-semibold text-white mb-4">Car Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-300 font-semibold">
                  <Armchair className="w-4 h-4 text-primary" />
                  <p>Seats:</p>
                </div>
                <p className="text-md text-white font-semibold">{ticket.car.no_seats}</p>
              </div>

                 
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-300 font-semibold">
                  <Fuel className="w-4 h-4 text-primary" />
                  <p>Mileage:</p>
                </div>
                <p className="text-md text-white font-semibold">{ticket.car.mileage} L</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-300 font-semibold">
                  <KeySquare className="w-4 h-4 text-primary" />
                  <p>Transmission:</p>
                </div>
                <p className="text-md text-white font-semibold">{ticket.car.transmission}</p>
              </div>
        
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-300 font-semibold">
                  <Calendar className="w-4 h-4 text-primary" />
                  <p>MFD:</p>
                </div>
                <p className="text-md text-white font-semibold">{ticket.car.year}</p>
              </div>
            </div>
        
            {/* Download Button */}
            {isRenter && (
              <div className="mt-10 flex justify-center">
                <Button className="bg-secondary text-gray-900">Download Ticket</Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        );
      })}
    </div>
  );
};



export default TicketDetails;
