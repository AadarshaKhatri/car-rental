import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users, Car, Eye,
  CalendarCheck
} from "lucide-react"

const ProfileInfo = () => {
  const summaryCards = [
    {
      title: "Total Views",
      value: "7,482",
      badge: "+18% from last month",
      icon: <Eye className="w-5 h-5 text-green-400" />,
      textColor: "text-green-600"
    },
    {
      title: "Clients",
      value: "1,289",
      badge: "+9% active users",
      icon: <Users className="w-5 h-5 text-blue-400" />,
      textColor: "text-blue-400"
    },
    {
      title: "Bookings",
      value: "364",
      badge: "+12 this week",
      icon: <CalendarCheck className="w-5 h-5 text-yellow-400" />,
      textColor: "text-yellow-400"
    },
    {
      title: "Available Cars",
      value: "28",
      badge: "5 in maintenance",
      icon: <Car className="w-5 h-5 text-purple-400" />,
      textColor: "text-purple-400"
    }
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {summaryCards.map(({ title, value, badge, icon, textColor }, i) => (
      <Card key={i}>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className={`text-sm ${textColor}`}>{title}</CardTitle>
          {icon}
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