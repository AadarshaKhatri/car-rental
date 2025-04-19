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

  return (
    <Card className="col-span-1">
    <CardHeader>
      <CardTitle>Car Transmission Types</CardTitle>
    </CardHeader>
    <CardContent className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 2, left: 20 }}>
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