"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { SignUp } from "../action/action";
import Link from "next/link";
import { toast } from "sonner";

const SignUpForm = () => {
  const [state, SignUpAction] = useActionState(SignUp, {
    success: false,
    error: null,
    message: null,
  });

  useEffect(() => {
    if (state) {
      if (state?.error) toast.error(state?.error);
      if (state?.message && !state?.error) toast.success(state?.message);
    }
  }, [state]);

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-background px-4">
      

      <div className="z-10 w-full max-w-md p-8 bg-transparent backdrop-blur-md rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-1">
          Create An Account
        </h2>

        <form action={SignUpAction} className="mt-6 space-y-6 text-left">
          {/* Email */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your Email"
              required
            />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your Username"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your Password"
              required
            />
            {state?.error && (
              <p className="text-red-500 text-xs mt-1">{state.error}</p>
            )}
          </div>

          <Button type="submit" className="w-full mt-2">
            Create Account
          </Button>
        </form>

 

      

        {/* Redirect to Login */}
        <p className=" mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
