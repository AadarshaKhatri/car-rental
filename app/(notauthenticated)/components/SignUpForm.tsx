"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { SignUp } from "../action/action";
import Link from "next/link";
import { toast } from "sonner";

const SignUpForm = () => {

  const [state, SignUpAction] = useActionState(SignUp,undefined);

  useEffect(() => {
    if (state) {
      if (state?.error) {
        console.log(state.message);
        toast.error(state?.error); 
      }
      if (state?.message && !state?.error) {
        toast.success(state?.message); 
      }
    }
  }, [state]);

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
                <CardHeader>Or</CardHeader>
              </div>

              <form className="flex flex-col gap-5" action={SignUpAction} >
                {/* Email */}
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Enter your Email" />
                  </div>
                </div>

                {/* Username */}
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" name="username" id="username" placeholder="Enter your Username" />
                  
                  </div>
                </div>


                  {/* Password */}
                  <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Enter your Password" />
                    {state?.error && <p className="text-red-500 text-xs">{state.error}</p>}
                  </div>
                </div>
                   <div className="py-3 w-full text-center">
                      <p className="text-sm text-white">Already have an account? <Link href="/login">Log In</Link></p>
                    </div>
                {/* ✅ Submit Button inside the form */}
                <CardFooter className="flex flex-col justify-center">
                  <Button type="submit">Sign Up</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
