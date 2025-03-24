"use client"

import { Checkbox } from "@/components/ui/checkbox"

export function Checkboxes() {
  return (
    <section className="w-full flex flex-row justify-center items-center gap-5">

      {/* 1. Seats */}
    <div className="flex items-center space-x-2">
      <Checkbox id="seats" />
      <label
        htmlFor="Seats"
        className=" text-white text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-80"
      >
      Seats
      </label>
    </div>

          {/* 2. Mileage */}
      <div className="flex items-center space-x-2">
      <Checkbox id="mileage"/>
      <label
        htmlFor="mileage"
        className=" text-white text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-80"
      >
        Mileage
      </label>
    </div>

              {/* 3. Type */}
              <div className="flex items-center space-x-2">
      <Checkbox id="type"/>
      <label
        htmlFor="mileage"
        className=" text-white text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-80"
      >
        Type
      </label>
    </div>

    </section>
  )
}
