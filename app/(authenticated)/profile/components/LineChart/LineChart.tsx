"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios";
import { useEffect, useState } from "react"
import { Line,LineChart, ResponsiveContainer, XAxis, YAxis,Tooltip } from "recharts"

interface LineGraphsTypes{
  value:string,
  month:string,
}
const LineGraph = () => {
  const [data,setData] = useState<LineGraphsTypes []>();

  useEffect(()=>{
    async function FetchData(){
      const {data} = await axios.get("/api/getLineChartMetrics")
      setData(data)
    }
    FetchData();
  },[])


  return (
    <Card className="col-span-1 md:col-span-2">
    <CardHeader>
      <CardTitle>Monthly Booking Trends</CardTitle>
    </CardHeader>
    <CardContent className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip labelClassName="text-gray-800"/>
          <Line type="bumpX" dataKey="no_of_Booking" stroke="#60a5fa" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
  )
}

export default LineGraph