"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import {
  Users, Car, Eye,
  CalendarCheck
} from "lucide-react"
import { ReactElement, useEffect, useState } from "react"

interface MettricsModel {
  title:string,
  value:string,
  icon:string,
  textColor:string,
  badge:string,
}
const ProfileInfo = () => {

  
  const iconMap: { [key: string] : ReactElement} = {
    car: <Car className="w-5 h-5" />,
    users: <Users className="w-5 h-5" />,
    eye: <Eye className="w-5 h-5" />,
    "calendar-check": <CalendarCheck className="w-5 h-5" />
  };

  // const summaryCards = [
  //   {
  //     title: "Total Views",
  //     value: "7,482",
  //     badge: "+18% from last month",
  //     icon: <Eye className="w-5 h-5 text-green-400" />,
  //     textColor: "text-green-600"
  //   },
  //   {
  //     title: "Clients",
  //     value: "1,289",
  //     badge: "+9% active users",
  //     icon: <Users className="w-5 h-5 text-blue-400" />,
  //     textColor: "text-blue-400"
  //   },
  //   {
  //     title: "Bookings",
  //     value: "364",
  //     badge: "+12 this week",
  //     icon: <CalendarCheck className="w-5 h-5 text-yellow-400" />,
  //     textColor: "text-yellow-400"
  //   },
  //   {
  //     title: "Available Cars",
  //     value: "28",
  //     badge: "5 in maintenance",
  //     icon: <Car className="w-5 h-5 text-purple-400" />,
  //     textColor: "text-purple-400"
  //   }
  // ]
  const [metrics,setMetrics] = useState<MettricsModel []>();
  useEffect(()=>{
    async function FetchData(){
      const {data} = await axios.get("/api/getProfileMetrics");
      setMetrics(data);
    }
    FetchData();
  },[])
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {metrics?.map(({ title, value, badge, icon, textColor }, i) => (
      <Card key={i} className="flex flex-col gap-4">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className={`text-sm ${textColor}`}>{title}</CardTitle>
          <span className={`${textColor}`}>
            {iconMap[icon]}
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{value}</div>
          <Badge variant="default" className="mt-2">{badge}</Badge>
        </CardContent>
      </Card>
    ))}
  </div>
  )
}

export default ProfileInfo