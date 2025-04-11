import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line,LineChart, ResponsiveContainer, XAxis, YAxis,Tooltip } from "recharts"

const LineGraph = () => {
  const monthlyData = [
    { month: "Jan", views: 120, bookings: 90 },
    { month: "Feb", views: 200, bookings: 150 },
    { month: "Mar", views: 280, bookings: 200 },
    { month: "Apr", views: 330, bookings: 260 },
    { month: "May", views: 420, bookings: 310 },
    { month: "Jun", views: 470, bookings: 370 },
  ]
  return (
    <Card className="col-span-2">
    <CardHeader>
      <CardTitle>Monthly Trends</CardTitle>
    </CardHeader>
    <CardContent className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={monthlyData}>
          <XAxis dataKey="month" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip />
          <Line type="monotone" dataKey="views" stroke="#4ade80" strokeWidth={2} />
          <Line type="monotone" dataKey="bookings" stroke="#60a5fa" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
  )
}

export default LineGraph