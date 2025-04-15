"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios";
import { useEffect, useState } from "react"
import { PieChart,Cell, Pie, ResponsiveContainer,Tooltip } from "recharts"

interface PieTypes{
  name:string,
  value:number,
}

const PieGraph = () => {
  const [data,setData] = useState<PieTypes []>();
  useEffect(()=>{
    async function FetchData(){
      console.log(await axios.get("/api/getPieChart") )
      const {data} = await axios.get("/api/getPieChart");
      setData(data);
    }
    FetchData();
  },[])
  console.log("Piec Chart Data",data);

  const COLORS = [
    "#60A5FA", // your primary blue
    "#3B82F6", // slightly darker blue (Tailwind blue-500)
    "#1E3A8A", // deep navy blue (Tailwind blue-900)
  ]
  





  return (
    <Card>
          <CardHeader>
            <CardTitle>Appication Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {data?.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
  )
}

export default PieGraph