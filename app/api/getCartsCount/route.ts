import { getCartCount } from "@/app/(authenticated)/carts/actions/action";
import { NextResponse } from "next/server";


export async function GET(){
  console.log("GET CART API Hit!");
  try{
    const count = await getCartCount();
    return NextResponse.json(count);

  }catch(error){
    console.log(error);
    return NextResponse.json({
      error:"Failed to fetchn the count!"
    },{status:500});
  }
}