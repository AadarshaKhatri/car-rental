"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Car, Clock, MapPin, User } from "lucide-react";
// import Image from "next/image";

const CarInformation = () => {
  return (
    <section className="w-fullflex justify-center items-center  pb-20">

      <div className="flex flex-col justify-center items-center">
      <Card className="w-full rounded-lg border-0 md:px-20">
        <CardContent className="flex flex-col md:flex-row gap-16 p-6">
          {/* Car Image */}
          <div className="w-[500px] h-auto bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Car Image Placeholder</span>
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
              <p><span className="text-white">Transmission:</span> Auto</p>
              <p><span className="text-white">Number of Seats:</span> 2 Person</p>
              <p><span className="text-white">Manufacture Date:</span> 2024</p>
              <p><span className="text-white">Mileage:</span> 70L</p>
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

      <Card className="w-full  rounded-xl border border-gray-800 text-white px-10">
      <CardContent>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Car className="text-primary w-8 h-8" />
          <h2 className="text-2xl font-bold">Car Booking Details</h2>
        </div>

        <div className="flex flex-row justify-between items-center gap-10">
            {/* Pick-up Details */}
            <div className="w-full p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-2 text-yellow-400">Pick-up Details</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="text-yellow-400" />
                  <span>100 Main Street, Perth Harbour 8007</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="text-blue-400" />
                  <span>November 15, 2022</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-green-400" />
                  <span>12:00 PM</span>
                </div>
              </div>
            </div>

              {/* Drop-off Details */}
              <div className="w-full p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold mb-2 text-yellow-400">Drop-off Details</h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-yellow-400" />
                    <span>100 Main Street, Perth Harbour 8007</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-blue-400" />
                    <span>November 20, 2022</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-green-400" />
                    <span>5:30 PM</span>
                  </div>
                </div>
              </div>
        </div>



  
      </CardContent>
    </Card>
      </div>
    </section>
  );
};

export default CarInformation;
