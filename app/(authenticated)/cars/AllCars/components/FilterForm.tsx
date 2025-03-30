"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export function RentRequest() {
  return (
    <section className="w-full flex flex-row justify-center items-center gap-5">
      <div className="w-full flex flex-col justify-center items-center">

        <div>
          <h2>Your Rental Requestes</h2>
        </div>

        {/* Table Here */ }

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
         
                    <TableRow    className="border-b  transition">
                  
                    
                    <TableCell className="table-padding font-medium">1</TableCell>
                    <TableCell className="table-padding">A</TableCell>
                    <TableCell className="table-padding">a</TableCell>
                    <TableCell className="table-padding">A</TableCell>
                    <TableCell className="table-padding">A per/day</TableCell>
                    <TableCell className="table-padding">A</TableCell>
                  
                    <TableCell className="table-padding">
                    <form>
                      <Input name="carId" className="hidden" />
                      <Button className="text-white bg-red-400 hover:bg-red-500/50">Delete</Button>
                    </form>
                      </TableCell>
                    </TableRow>
           
              </TableBody>
            </Table>
          </div>

      </div>      
    </section>
  )
}
