import { Suspense } from "react";
import SignInForm from "../components/SignInForm";



export default function LoginPage(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <section className="container max-w-full mx-auto">
      <div><SignInForm/></div>
    </section>
    </Suspense>
 
  )
}