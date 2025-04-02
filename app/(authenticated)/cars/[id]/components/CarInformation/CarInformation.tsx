"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
// import Image from "next/image";

const CarInformation = () => {
  return (
    <section className="w-fullflex justify-center items-center min-h-screen ">
      <Card className="w-full shadow-lg rounded-lg">
        <CardContent className="flex flex-col md:flex-row gap-6 p-6">
          {/* Car Image */}
          <div className="w-[500px] h-auto bg-red-400 rounded-lg">
            {/* <Image
              src="#"
              alt="Car Image"
              width={500}
              height={300}
              className="rounded-lg object-cover w-full"
            /> */}
          </div>

          {/* Car Details */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-semibold text-white">Nissan GT - R</h2>
              <div className="flex flex-row justify-center items-center gap-1">
                <User/>
               <p className="text-sm text-gray-400">Requested By 2</p>
              </div>
              
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-400">
            </div>

            {/* Car Info */}
            <p className="text-gray-400 text-md">
              NISMO has become the embodiment of Nissan&apos;s outstanding performance, inspired by the most
              unforgiving proving ground, the race track.
            </p>

            <div className="grid grid-cols-2 gap-3 text-gray-300 text-md">
              <p><span className="text-white">Type:</span> Sport</p>
              <p><span className="text-white">Capacity:</span> 2 Person</p>
              <p><span className="text-white">Steering:</span> Manual</p>
              <p><span className="text-white">Gasoline:</span> 70L</p>
            </div>

            {/* Price & Rent Button */}
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-lg font-semibold text-white">$80.00/day</p>
                <p className="text-gray-500 line-through">$100.00</p>
              </div>
              <Button>
                Rent Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CarInformation;
