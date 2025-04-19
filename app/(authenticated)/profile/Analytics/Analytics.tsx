"use client"



import Heading from "../components/Headings/Heading"
import ProfileInfo from "../components/ProfileInfo/ProfileInfo"
import LineGraph from "../components/LineChart/LineChart"
import PieGraph from "../components/PieChart/PieChart"
import BarGraph from "../components/BarGraph/BarGraph"
import CarPerformance from "../components/CarPerformance/CarPerformance"
import TopCars from "../components/TopCars/TopCars"
import Summary from "../components/Summary/Summary"
import ExpensiveCars from "../components/ExpensiveCars/ExpensiveCars"











export default function Analytics() {
  return (
    <div className="w-full min-h-screen px-6 py-10 space-y-10 text-gray-700">

      {/* Header */}
      <Heading/>

      {/* Summary Cards */}
      <ProfileInfo/>
  

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 pb-20 md:pb-10">

        {/* Line Chart */}
        <LineGraph/>

        {/* Pie Chart */}
        <PieGraph/>

        {/* Bar Chart */}
        <BarGraph/>

        {/* Stacked Bar Chart - Performance by Car Type */}
        <CarPerformance/>

          {/* Top Performing Cars */}
          <TopCars/>
        
         {/* HIgh Valued Rentals */}
        <ExpensiveCars/>

        {/* Social Summary */}
        <Summary/>
      </div>
    </div>
  )
}
