"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { SignIn } from "../action/action";
import { toast } from "sonner";

const SignInForm = () => {
  const [state, SignInAction] = useActionState(SignIn, {
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
        <h2 className="text-2xl font-semibold mb-1">Login</h2>

        <form action={SignInAction} className="mt-6 space-y-4 text-left">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <Label  htmlFor="email">Email address</Label>
            <Input
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              type="email"
              name="email"
              id="email"
              placeholder="ali.miran@example.com"
              required
              className="mt-1"
            />
          </div>

          {/* Password */}
          <div  className="flex flex-col gap-1">
              <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              autoComplete="off"
              autoCorrect="off"
              required
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full mt-2">
            Login
          </Button>
        </form>


        {/* Bottom Sign Up */}
        <p className="mt-6 text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
