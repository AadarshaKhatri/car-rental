"use server"

import { hashpassword, verifyPassword } from "@/lib/hasher";
import prisma from "@/lib/prisma";
import { SignInSchema, SignUpSchmea } from "@/lib/schemas"
import { PrevState } from "@/lib/types";
import { z } from "zod";
import { createSession } from "../session";



export async function SignIn (prevState:PrevState,formData : z.infer<typeof SignInSchema>) : Promise<PrevState>{
  try{
    const {success,error} = SignInSchema.safeParse(formData);
    if(!success) { 
      return{
        success:false,
        error:"Email or Password incorrect!",
        message:error.flatten().fieldErrors.email || error.flatten().fieldErrors.password,
      }
    }
    const FoundUser = await prisma.User.findUnique({
      where:{
        email:formData.email,
      }
    });
    const isPasswordMatch = await verifyPassword(formData.password,FoundUser.password);
    if(!isPasswordMatch){
      return{
        success:false,
        error:"Email or Password is Incorrect!", 
        message:null,
      }
    }else{
      await createSession(FoundUser.id,FoundUser.role)
      return {success:true,message:"User Logged In",error:null}
    }
    
  }catch(error){

    return {
      error:"Failed to Log In!", 
      message:`${error}`,
      success:false
    }
  }
}


export async function SignUp(prevState: PrevState,formData: z.infer<typeof SignUpSchmea>) : Promise<PrevState>{
  try{
    
    const {success,error} = SignUpSchmea.safeParse(formData);
    if(!success){
      return{
        success:false,
        error:"Faile to Validate",
        message:error.flatten().fieldErrors.email ||error.flatten().fieldErrors.password,
      }
    }

    
    const hasUser = await prisma.User.findUnique({
      where:{
        email:formData.email,
      }
    });

    if(hasUser!==null){
      return{
        success:false,
        error:"User already exists",
        message:null,
      }
    }
  const user = await prisma.User.create({
    data:{
      email:formData.email,
      password:hashpassword(formData.password),
    }
  })
  if(!user){
    return { 
      success:false,
      error:"Failed to create a Account!",
      message:null,
    }
  }else{
  await createSession(user.id,user.role);
  return{
    success:true,
    error:null,
    message:"User Created!",
  }
  }
  }catch(error){
    return { 
      error:"Failed to Sign Up", 
      message:`${error}`,
      success:false,
    }
  }
}