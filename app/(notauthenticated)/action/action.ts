"use server"

import { hashpassword, verifyPassword } from "@/lib/hasher";
import prisma from "@/lib/prisma";
import { SignInSchema, SignUpSchmea } from "@/lib/schemas"
import { PrevState } from "@/lib/types";
import { createSession, deleteSession } from "../session"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";



export async function SignIn (prevState:PrevState,formData : FormData) : Promise<PrevState>{
  try{
    const {success,error} = SignInSchema.safeParse({
      email:formData.get("email") as string,
      password:formData.get("password") as string,
    });
    if(!success) { 
      return{
        success:false,
        error:"Email or Password incorrect!",
        message:error.flatten().fieldErrors.email || error.flatten().fieldErrors.password,
      }
    }
    const FoundUser = await prisma.user_model.findUnique({
      where:{
        email:formData.get("email") as string,
      }
    });
    if(!FoundUser){
      return { 
        success:false,
        error:"User Not Found!",
        message:null,
      }
    }
    const isPasswordMatch = await verifyPassword(formData.get("password") as string,FoundUser.password);
    if(!isPasswordMatch){
      return{
        success:false,
        error:"Email or Password is Incorrect!", 
        message:null,
      }
    }else{
      await createSession(FoundUser.id,FoundUser.role)
 
    }
  }catch(error){
    console.log(`${error}`);
    return {
      error:"Failed to Log In!", 
      message:`${error}`,
      success:false
    }
  }
  revalidatePath("/", "layout");
  redirect("/dashboard");
}


export async function SignUp(prevState: PrevState,formData:FormData) : Promise<PrevState>{
  console.log("Sign Up Action Hit!");
  try{
    const {success,error} = SignUpSchmea.safeParse({
      email:formData.get("email") as string,
      password:formData.get("password") as string,
      name:formData.get("username") as string ,
    });
    if(!success){
      return{
        success:false,
        error:"Faile to Validate",
        message:error.flatten().fieldErrors.email ||error.flatten().fieldErrors.password,
      }
    }

    
    const hasUser = await prisma.user_model.findUnique({
      where:{
        email:formData.get("email") as string,
      }
    });

    if(hasUser!==null){
      return{
        success:false,
        error:"User already exists",
        message:null,
      }
    }
  const user = await prisma.user_model.create({
    data:{
      email:formData.get("email") as string,
      password:await hashpassword(formData.get("password") as string),
      name:formData.get("username") as string,
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
  }
  }catch(error){
    return { 
      error:"Failed to Sign Up", 
      message:`${error}`,
      success:false,
    }
  }
  revalidatePath("/", "layout");
  redirect("/dashboard");
}


export async function Logout(){
  await deleteSession();
  revalidatePath("/","layout");
  redirect("/login");
}