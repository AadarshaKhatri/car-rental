import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart,Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const BarGraph = () => {
  const monthlyData = [
    { month: "Jan", views: 120, bookings: 90 },
    { month: "Feb", views: 200, bookings: 150 },
    { month: "Mar", views: 280, bookings: 200 },
    { month: "Apr", views: 330, bookings: 260 },
    { month: "May", views: 420, bookings: 310 },
    { month: "Jun", views: 470, bookings: 370 },
  ]
  return (
    <Card>
    <CardHeader>
      <CardTitle>Bookings Bar View</CardTitle>
    </CardHeader>
    <CardContent className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData}>
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip/>
          <Bar dataKey="bookings" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
  )
}

export default BarGraph