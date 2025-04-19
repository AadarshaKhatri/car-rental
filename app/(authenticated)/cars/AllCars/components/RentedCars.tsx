import { Button } from "@/components/ui/button";
import axios from "axios";
import { Armchair, Calendar, Car, Fuel, KeySquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CarModel {
  brand: string;
  mileage: number;
  pricePerDay: number;
  no_seats: number;
  transmission: string;
  year: number;
  imageUrl: string;
}

interface RentalModel {
  startDate: string;
  endDate: string;
}

interface RentedCar {
  id: string;
  bookedUserID: string;
  rentalId: string;
  carId: string;
  rents: RentalModel;
  cars: CarModel;
}

const RentedCars = () => {
  const [rentedCars, setRentedCars] = useState<RentedCar[]>([]);

  useEffect(() => {
    async function FetchData() {
      const { data } = await axios.get("/api/getUserRentedCars");
      if (data) setRentedCars(data);
    }
    FetchData();
  }, []);

  return (
    <Link href={`/cars/${rentedCars.map((car) => car.carId)}`}>
      <div className="w-[300px] md:w-[350px]">
        <h2 className="text-lg font-semibold text-center pb-5">Your Rented Cars</h2>
        {rentedCars.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 p-6 border border-primary rounded-lg shadow-md">
            <Car className="w-12 h-12 text-primary" />
            <h6 className="text-sm text-gray-400">
              You haven&apos;t rented any cars yet.
            </h6>
            <Button>Book a Car!</Button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-5">
            {rentedCars.map((rentedCar, index) => (
              <div
                key={index}
                className="md:w-[350px] p-4 shadow-md rounded-lg border border-primary flex items-center gap-3"
              >
               
                {rentedCar?.cars.imageUrl ? (
                <div className="w-40 h-16 bg-secondary rounded-md flex items-center justify-center">
                  <Image
                    src={`${rentedCar?.cars?.imageUrl}`}
                    alt="Car Image"
                    height={10}
                    width={10}
                    priority={true}
                    quality={100}
                    className="w-full md:w-full h-full rounded-md flex items-center justify-center"
                  />
                </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">Car Image Not Available</p>
                )}

                {/* Car Details */}
                <div className="w-[200px] flex flex-col flex-grow gap-1">
                  <h2 className="text-lg font-semibold text-primary">
                    {rentedCar.cars.brand}
                  </h2>
                  <div className="flex justify-between items-center ">
                    <div className="flex justify-center items-center gap-1">
                      <Fuel className="w-3 h-3 text-primary" />
                      <p className="text-sm text-white/50 min-w-10">
                        {rentedCar.cars.mileage} L
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      <KeySquare className="w-3 h-3 text-primary" />
                      <p className="text-sm text-white/50 min-w-14">
                        {rentedCar.cars.transmission}
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      <Calendar className="w-3 h-3 text-primary" />
                      <p className="text-sm text-white/50 min-w-10">
                        {rentedCar.cars.year}
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      <Armchair className="w-3 h-3 text-primary" />
                      <p className="text-sm text-white/50 min-w-10">
                        {rentedCar.cars.no_seats}
                      </p>
                    </div>
                  </div>

                  {/* Rental End Date */}
                  <p className="text-sm text-white/40">
                    Rented till:{" "}
                    {new Date(rentedCar.rents.endDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default RentedCars;
