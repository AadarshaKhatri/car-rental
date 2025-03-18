"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react"
import { SignUp } from "../action/action"



const SignUpForm = () => {
  const [state,action] = useActionState(SignUp,{
    success:false,
    message:null,
    error:null,
  });
  console.log(state);
  return (

      <section className="container max-w-full mx-auto">
      <div className="w-full min-h-screen flex flex-col justify-center items-center">

          <div className="flex flex-row justify-between items-center">
          <Card className="md:w-[350px]">
      <CardHeader>
        <CardTitle>Create an Account to start booking!</CardTitle>
      </CardHeader>
      <CardContent>
        
        <div className="flex flex-row justify-center items-center">
          <CardHeader>
            Or
          </CardHeader>
        </div>
        <form action={action} >

          {/* Email */}
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="Enter your Email" />
            </div>
            <div className="flex flex-col space-y-1.5">
          
            </div>
          </div>
          {/* Password */}
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" id="password" placeholder="Enter the password" />
            </div>
            <div className="flex flex-col space-y-1.5">
          
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button>Sign Up</Button>
      </CardFooter>
      </Card>
          </div>
      </div>
      </section>
    
  )
}

export default SignUpForm
