"use server";

import SignUpForm from "../components/SignUpForm";


export default async function SignUPPage(){
  return ( 
    <section>
      <div>
        <SignUpForm/>
      </div>
    </section>
  )
}