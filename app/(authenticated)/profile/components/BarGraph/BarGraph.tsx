"use client"


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios";
import { useEffect, useState } from "react";
import { BarChart,Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface BarGraphTypes{
  type:string,
  value:number,
}
const BarGraph = () => {

  const [data,setData] = useState<BarGraphTypes []>();
  useEffect(()=>{
    async function FetchData() {
      const {data} = await axios.get("/api/getBarChart")
      setData(data);
    }
    FetchData();
  },[])

  const monthlyData = [
    { month: "Jan", views: 120, bookings: 90 },
    { month: "Feb", views: 200, bookings: 150 },

  ]
  return (
    <Card>
    <CardHeader>
      <CardTitle>Bookings Bar View</CardTitle>
    </CardHeader>
    <CardContent className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip/>
          <Bar dataKey="value" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
  )
}

export default BarGraph