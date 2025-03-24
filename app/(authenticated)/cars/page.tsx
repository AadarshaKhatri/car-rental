"use client"

import { Button } from "@/components/ui/button"
import LayoutWrapper from "../LayoutWrapper"
import { useState } from "react"
import AllCars from "./AllCars/components/AllCars";
import YourCars from "./YourCars/YourCars";
const CarsPage = () => {
  const [activeTabs,setActiveTabs] = useState<string>("All Cars");

  function handleTabs(tab:string){
    setActiveTabs(tab);
  }
  return (
   
      <LayoutWrapper>
        <div className="w-full overflow-hidden">
          <div className=" flex flex-col justify-between items-center">

            <div className="w-full flex flex-row justify-between items-center">

              {/* Choose Between the Cars */}
              <div className="flex justify-center items-center gap-5">
              <div className="flex flex-row justify-between pb-5">
                  {["All Cars", "Your Cars"].map((tab) => (
                    <div
                      key={tab}
                      onClick={() => handleTabs(tab)}
                      className={`font-semibold cursor-pointer py-2 px-2 md:px-4 text-lg transition-all duration-100 
                        ${activeTabs === tab ? "text-white border-b-4 border-primary bg-muted/40 rounded-t-md " : "text-gray-600"}`}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Your Cars  */}

              <div>
                <Button className="hidden">Add Cars</Button>
              </div>

            </div>


            {/* UI Component */}
            <div className="w-full">
              <div className={`transition-opacity duration-300 ${activeTabs === "All Cars" ? "opacity-100" : "opacity-0"}`}>
              {
                activeTabs === "All Cars" && <AllCars/>
              }
              </div>

              <div className={`transition-opacity duration-300 ${activeTabs === "Your Cars" ? "opacity-100" : "opacity-0"}`}>
              {
                activeTabs === "Your Cars" && <YourCars/>
              }
              </div>

            </div>

          </div>
          
        </div>
      </LayoutWrapper>
    
  )
}

export default CarsPage