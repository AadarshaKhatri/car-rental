"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CarModel } from "@/lib/types";
import axios from "axios";

import React, { useActionState, useEffect, useState } from 'react'
import { deleteCars } from "../../actions/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navigation } from "lucide-react";



const CarsTable = () => {
  const router = useRouter();
  const [cars,setCars] = useState<CarModel []>();
  const [state,carDeleteAction] = useActionState(deleteCars,{
    success:false,
    error:null,
    message:null,
  });
  useEffect(()=>{
    async function FetchCar(){
      const data : CarModel [] = await ((await axios.get("/api/getAllUserCars")).data)
      if(!data){
        return null;
      }
      setCars(data);
    }
    
    FetchCar();
  },[])
  
  useEffect(()=>{
    if(state?.success){
      toast.success("Car Deleted Sucessfully!");
      router.refresh();
    }
  },[state,router])
  
  return (
    <section className='w-full pb-20'>
       <div className="w-full overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="text-lef border-muted">
                  <TableHead className="table-padding">ID</TableHead>
                  <TableHead className="table-padding">Brand</TableHead>
                  <TableHead className="table-padding">MFD Date</TableHead>
                  <TableHead className="table-padding">Transmission</TableHead>
                  <TableHead className="table-padding">Pricing</TableHead>
                  <TableHead className="table-padding">Car Status</TableHead>
                  <TableHead className="table-padding">Delete Cars</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                
                {
                  cars === null ? 
                  <TableRow>
                    <div className="flex ">
                      <p className="text-white">No Cars Avaialble!</p>
                    </div>
                    </TableRow>
                  :
                    cars?.map((car,index)=>(
                    <TableRow  key={index}  className="border-b  transition">
                  
                    
                    <TableCell className="table-padding font-medium">{index+1}</TableCell>
                    <TableCell className="table-padding">{car.brand}</TableCell>
                    <TableCell className="table-padding">{car.year}</TableCell>
                    <TableCell className="table-padding">{car.transmission}</TableCell>
                    <TableCell className="table-padding">{car.pricePerDay} per/day</TableCell>
                    <TableCell className="table-padding">{car.status}</TableCell>
                  
                    <TableCell className="table-padding">
                    <form action={carDeleteAction}>
                      <Input name="carId" className="hidden" defaultValue={car.id}/>
                      <Button className="text-white bg-red-400 hover:bg-red-500/50">Delete</Button>
                    </form>
                      </TableCell>
                      <TableCell>
                      <Link className="w-full" href={`/cars/${car.id}`} passHref>
                      <Navigation className="text-primary"/>
                      </Link>
                      </TableCell>
                      
                    </TableRow>
                    ))
                  
                }
              </TableBody>
            </Table>
          </div>
    </section>
  )
}

export default CarsTable