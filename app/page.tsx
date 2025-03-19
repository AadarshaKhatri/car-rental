import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {

  return (
  <div className=" flex gap-10 p-10">
   <Button variant={"default"}><Link href="/login">Sign In</Link></Button>
   <Button variant={"default"}><Link href="/signup">Sign Up</Link></Button>
  <div className="flex flex-col gap-4">
    <h1>User Id :1</h1>
    <h2>User Role: user</h2>



  </div>
  </div>
  );
}