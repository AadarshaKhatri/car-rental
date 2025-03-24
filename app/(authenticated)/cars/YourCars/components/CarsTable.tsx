import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import React from 'react'

const CarsTable = () => {
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
                <TableRow className="border-b  transition">
                  <TableCell className="table-padding font-medium">1</TableCell>
                  <TableCell className="table-padding">Aadarsha Khatri</TableCell>
                  <TableCell className="table-padding">12 points</TableCell>
                  <TableCell className="table-padding">12</TableCell>
                  <TableCell className="table-padding">4 events</TableCell>
                  <TableCell className="table-padding">Rented</TableCell>

                  <TableCell className="table-padding"><Button className="text-white bg-red-400 hover:bg-red-500/50">Delete</Button></TableCell>
                </TableRow>

                <TableRow className="border-b  transition">
                  <TableCell className="table-padding font-medium">1</TableCell>
                  <TableCell className="table-padding">Aadarsha Khatri</TableCell>
                  <TableCell className="table-padding">12 points</TableCell>
                  <TableCell className="table-padding">12</TableCell>
                  <TableCell className="table-padding">4 events</TableCell>
                  <TableCell className="table-padding">In Progress</TableCell>

                  <TableCell className="table-padding"><Button className="text-white bg-red-400 hover:bg-red-500/50">Delete</Button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
    </section>
  )
}

export default CarsTable