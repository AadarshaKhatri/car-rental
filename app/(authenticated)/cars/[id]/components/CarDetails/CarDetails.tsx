"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { Armchair, Calendar, Fuel, KeySquare } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { bookforRental } from "../../../actions/action";
import { Input } from "@/components/ui/input";
import { CarModel } from "@/lib/types";
import { toast } from "sonner";
import { useActionState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EditCarDialogue from "../EditCarDialogue/EditCarDialogue";
import Image from "next/image";


interface AppliedUsers{
  status:string,
  id:string,
}

interface Rental {
  id: string;
  endDate: string;
  startDate: string;
  status: string;
  appliedUsers: AppliedUsers [] 
}

interface CarInformationTypes extends CarModel {
  author:{
    name:string,
    id:string,
  }
  rentals: Rental[];
}

const CarDetails = ({ id }: { id: string }) => {
  const params = useParams();
  const [cars, setCars] = useState<CarInformationTypes>();
  const [selectedRentalId, setSelectedRentalId] = useState<string>("");

  const [state, requestBookingAction] = useActionState(bookforRental, {
    success: false,
    error: null,
    message: null,
  });

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/getCarInformation/${params.id}`);
      setCars(data);
    }
    fetchData();
  }, [params]);

  useEffect(() => {
    if (state.success) {
      toast.success("Request sent to the owner!");
    }
  }, [state]);

  const cardContents = [
    { label: "Mileage", icon: Fuel, value: `${cars?.mileage} L` },
    { label: "Transmission", icon: KeySquare, value: `${cars?.transmission}` },
    { label: "MFD", icon: Calendar, value: `${cars?.year}` },
    { label: "Seats", icon: Armchair, value: `${cars?.no_seats}` },
  ];

  const handleTabSelect = (rentalId: string) => {
    setSelectedRentalId(rentalId);
  };

  return (
    <section className="w-full">
      <Card className="w-full rounded-lg border-0 md:px-20">
        <CardContent className="flex flex-col md:flex-row gap-10 p-6">
          {/* Image Placeholder */}
          <div className="w-full md:w-[490px] h-72  rounded-lg flex items-center justify-center">
            
            {
              cars?.imageUrl ? 
              <Image 
                  src={`${cars?.imageUrl}`}
                  alt="Car Image"
                  height={100}
                  width={100}
                  priority={true}
                  quality={100}
                  className="w-full md:w-[890px] h-72 flex items-center justify-center object-cover"
            />
              :
              null
            }
          </div>

          {/* Car Details */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">
                {cars?.brand}
              </h2>

              {/* Show rental request count if it's the owner's view */}
              {cars?.authorId === id && (
                <div className="flex items-center gap-2 text-gray-400">
                  <EditCarDialogue/>
                </div>
              )}
            </div>
            {
              cars?.authorId === id ? 
              <div className="text-sm text-white/70">
              <strong>Owner:</strong> Your Car
            </div>
              : 
              <div className="text-sm text-white/70">
              <strong>Owner:</strong> {cars?.author?.name}
            </div>
            }
          

            <div className="grid grid-cols-2 gap-3">
              {cardContents.map(({ value, icon: Icon, label }, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-white/70">{label}:</span>
                  <span className="text-white/50">{value}</span>
                </div>
              ))}
            </div>

            {/* Rentals */}
            {
              cars?.authorId !== id  ?
              (
                cars?.rentals && (
                  <>
                    <p className="text-sm text-gray-300 mt-2">
                      Available Rental Dates:
                    </p>
              
                    {cars.rentals.some(rental => rental.status === "AVAILABLE") ? (
                      <div className="flex flex-wrap gap-3">
                        {cars.rentals.map((rental) =>
                          rental.status === "AVAILABLE" ? (
                            <div
                              key={rental.id}
                              onClick={() => handleTabSelect(rental.id)}
                              className={`py-2 px-4 rounded-md text-sm cursor-pointer transition-colors ${
                                selectedRentalId === rental.id
                                  ? "bg-primary text-background"
                                  : "bg-gray-800 text-white"
                              }`}
                            >
                              {new Date(rental.startDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}{" "}
                              -{" "}
                              {new Date(rental.endDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                          ) : null
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-red-200 mt-2">
                        No rental dates available at the moment.
                      </p>
                    )}
                  </>
                )
              )
              :
              (
              cars?.rentals?.length ? (
                <>
                  <p className="text-sm text-gray-300 mt-2">
                    Rental Information of the Car
                  </p>
                  <Table className="w-full table-fixed">
                    <TableHeader>
                      <TableRow>
                        <TableHead className=" px-4 py-3 whitespace-nowrap">Rental Id</TableHead>
                        <TableHead className="px-4 py-3 whitespace-nowrap">Start Date</TableHead>
                        <TableHead className="px-4 py-3 whitespace-nowrap">End Date</TableHead>
                        <TableHead className="px-4 py-3  whitespace-nowrap">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cars.rentals.map((rental, index) => (
                        <TableRow key={rental.id}>
                          <TableCell className=" text-center px-4 py-3 whitespace-nowrap">{index + 1}</TableCell>
                          <TableCell className="px-4 py-3 whitespace-nowrap">
                            {new Date(rental.startDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </TableCell>
                          <TableCell className="px-4 py-3 whitespace-nowrap">
                            {new Date(rental.endDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </TableCell>
                          <TableCell className="px-4 py-3 whitespace-nowrap">{rental.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                </>
                 ) : (
                  <p className="text-sm text-gray-400 mt-2">
                    You haven&apos;t made the car available for rental
                  </p>

                 )
                )
              
            }

            {/* Price and Booking */}
            <div className="flex justify-between items-center mt-6">
              <p className="text-lg font-semibold text-white">
                Rs {cars?.pricePerDay} / per day
              </p>
              {
                cars?.authorId === id ? 
                  <Button disabled>Rent Now</Button>
                :
                  <form
                    action={requestBookingAction}
                    className="flex gap-2 items-center"
                  >
                    <Input name="carId" className="hidden" defaultValue={cars?.id} />
                    <Input
                      name="rentalId"
                      className="hidden"
                      defaultValue={selectedRentalId}
                    />
                    <Button type="submit">Rent Now</Button>
                  </form>
              }
            </div>


          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CarDetails;
