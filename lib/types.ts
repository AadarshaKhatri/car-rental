
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
  year:number
  transmission:string
  pricePerDay:Float16Array
  imageUrl?:string
}

export interface RentalModel extends CarModel {
  id:string
  status:string
  startDate:Date
  endDate:Date,
}


export interface BookingModel{
  id:string
  userId:string
  rentalId:string
  carId:string
}

export interface AppliedUsersModel {
  id:string
  rentalId:string
  applicantId:string
  status:string
}