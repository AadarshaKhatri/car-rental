import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart,Cell, Pie, ResponsiveContainer,Tooltip } from "recharts"

const PieGraph = () => {
  const bookingSourceData = [
    { name: "App", value: 300 },
    { name: "Website", value: 180 },
    { name: "Phone", value: 120 },
  ]
const COLORS = ["#4ade80", "#60a5fa", "#facc15"]

  return (
    <Card>
          <CardHeader>
            <CardTitle>Booking Source</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingSourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {bookingSourceData.map((entry, index) => (
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