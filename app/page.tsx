import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser } from "./(authenticated)/session";

export default async function Home() {
  const user = await getUser();
  console.log(user)
  return (
  <div className=" flex gap-10 p-10">
   <Button variant={"default"}><Link href="/login">Sign In</Link></Button>
   <Button variant={"default"}><Link href="/signup">Sign Up</Link></Button>
  <div className="flex flex-row">
    <h1>User Id : {user?.id}</h1>
    <h2>User Role: {user?.role}</h2>

  </div>
  </div>
  );
}