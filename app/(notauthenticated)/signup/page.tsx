"use server";

import { Suspense } from "react";
import SignUpForm from "../components/SignUpForm";


export default async function SignUPPage(){
  return ( 
    <Suspense fallback={<div>Loading...</div>}>
    <section>
      <div>
        <SignUpForm/>
      </div>
    </section>
    </Suspense>
  )
}