"use client";

import { Logout } from "@/app/(notauthenticated)/action/action";
import { Button } from "@/components/ui/button";
import { ReactNode, useActionState } from "react";
import { toast } from "sonner";

interface LogoutButtonProps {
  children: ReactNode;
}


const LogoutButton = ( {children} : LogoutButtonProps) => {
  const [state,LogoutAction] = useActionState(Logout,undefined);
  if(state){
    toast.success("Logout out!");
  }
  return (
    <section>
      <div>
        <form action={LogoutAction}>
        <Button className="bg-red-400 text-white hover:bg-red-400/40">{children}</Button>
        </form>
      </div>
    </section>
  )
}

export default LogoutButton