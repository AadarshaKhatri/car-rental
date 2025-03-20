"use client";

import { Logout } from "@/app/(notauthenticated)/action/action";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { toast } from "sonner";


const LogoutButton = () => {
  const [state,LogoutAction] = useActionState(Logout,undefined);
  if(state){
    toast.success("Logout out!");
  }
  return (
    <section>
      <div>
        <form action={LogoutAction}>
        <Button className="bg-red-400 text-white">Log Out</Button>
        </form>
      </div>
    </section>
  )
}

export default LogoutButton