
export type PrevState = {
  success: boolean;
  error: string | null;
  message: string | null | string[] | undefined;
};


export type CarModel = {
  brand:string
  mileage:number
  no_seats:number
}