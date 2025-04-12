import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const CarPerformance = () => {
  const carTypePerformanceData = [
    { type: "SUV", bookings: 140, views: 320 },
    { type: "Sedan", bookings: 110, views: 290 },
    { type: "Hatchback", bookings: 90, views: 200 },
    { type: "Truck", bookings: 60, views: 160 },
    { type: "Electric", bookings: 40, views: 130 },
  ]
  
  return (
    <Card className="col-span-2">
    <CardHeader>
      <CardTitle>Performance Breakdown by Car Type</CardTitle>
    </CardHeader>
    <CardContent className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={carTypePerformanceData}>
          <XAxis dataKey="type" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Bar dataKey="views" stackId="a" fill="#c084fc" />
          <Bar dataKey="bookings" stackId="a" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
  )
}

export default CarPerformance