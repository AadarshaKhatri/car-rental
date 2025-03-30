
export type PrevState = {
  success: boolean;
  error: string | null;
  message: string | null | string[] | undefined;
};


export type CarModel = {
  id:string
  authorId:string
  brand:string
  mileage:number
  no_seats:number
  status:string
  year:number
  transmission:string
  pricePerDay:Float16Array
}

export interface RentalModel extends CarModel {
  id:string
  status:string
  startDate:Date
  endDate:Date,
}