
export type PrevState = {
  success: boolean;
  error: string | null;
  message: string | null | string[] | undefined;
};


export type CarModel = {
  id:string
  userId:string
  brand:string
  mileage:number
  no_seats:number
  status:string
  MFD_Date:number
  transmission:string
  pricePerDay:Float16Array

}

export type RentalModel = {
  startDate:Date
  endDate:Date,
}