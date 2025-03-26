import {z} from "zod";

export const SignInSchema = z.object({
  email:z.string().email(),
  password:z.string().min(2), 
})

export const SignUpSchmea = z.object({
  email:z.string().email(),
  password:z.string().min(2),
  name:z.string().min(2),
})


export const sessionSchema = z.object({
  id:z.string(),
  role:z.string(),
  expiresAt:z.date(),
})

export const CarSchema = z.object({
  no_seats :z.number().max(20).min(2),
  mileage:z.number().min(1),
  brand:z.string(),
  status:z.string(),
  MFD_Date:z.number().min(1990).max(new Date().getFullYear()),
  transmission:z.string(),
  pricePerDay:z.number().min(0),
})

export const RentalSchema = z.object({
  userId:z.string(),
  carId:z.string(),
  startDate:z.date(),
  endDate:z.date()
})