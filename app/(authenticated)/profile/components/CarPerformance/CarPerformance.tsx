"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"



const data = [
  { brand: "Toyota", rentals: 18 },
  { brand: "Honda", rentals: 14 },
  { brand: "Tesla", rentals: 9 },
  { brand: "Ford", rentals: 7 },
  { brand: "Hyundai", rentals: 11 },
]


const CarPerformance = () => {
  return (
    <Card className="col-span-2">
    <CardHeader>
      <CardTitle>Rentals by Car Brand</CardTitle>
    </CardHeader>
    <CardContent className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis dataKey="brand" type="category" name="Brand" />
          <YAxis dataKey="rentals" type="number" name="Rentals" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Rentals" data={data} fill="#60a5fa" />
        </ScatterChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
  )
}

export default CarPerformance
