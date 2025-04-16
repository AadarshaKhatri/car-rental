"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { useEffect, useState } from "react"
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from "recharts"

const CarPerformance = () => {
  const [data, setData] = useState<{ brand: string, rentals: number }[]>([]);

  useEffect(() => {
    async function FetchData() {
      const { data } = await axios.get("/api/getCarByFilter");
      setData(data);
    }
    FetchData();
  }, []);

  console.log("Data", data);

  return (
    <Card className="col-span-2">
      <CardHeader>
      <CardTitle>Cars Categorized by Manufactured Year</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px]">
      <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 20, bottom: 50, left: 20 }}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Total_Cars" fill="#C27AFF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CarPerformance;
