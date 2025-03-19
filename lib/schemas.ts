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
  id:z.number(),
  role:z.string(),
  expiresAt:z.date(),
})