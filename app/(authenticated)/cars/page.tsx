"use client"

import { Button } from "@/components/ui/button"
import LayoutWrapper from "../LayoutWrapper"
import { useState } from "react"
import AllCars from "./AllCars/AllCars";
import YourCars from "./YourCars/YourCars";
const CarsPage = () => {
  const [activeTabs,setActiveTabs] = useState<string>("Rent Cars");

  function handleTabs(tab:string){
    setActiveTabs(tab);
  }
  return (
   
      <LayoutWrapper>
        <div className="w-full overflow-hidden">
          <div className=" flex flex-col justify-between items-center">

            <div className="w-full flex flex-row justify-center md:justify-between items-center ">

              {/* Choose Between the Cars */}
              <div className="flex justify-center items-center ">
              <div className="flex flex-row justify-between items-center gap-10 md:gap-5 pb-5">
                  {["Rent Cars", "Your Cars"].map((tab) => (
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
              <div className={`transition-opacity duration-300 ${activeTabs === "Rent Cars" ? "opacity-100" : "opacity-0"}`}>
              {
                activeTabs === "Rent Cars" && <AllCars/>
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