import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./app/(notauthenticated)/session";

const publicroutes = ["/","/login","/signup"];
const privateRoutes = ["/private"]
const adminroutes = ["/admin"]
export async function middleware(req:NextRequest){
  try{
    const user = await verifySession();

    if (publicroutes.includes(req.nextUrl.pathname) && user) {
      return NextResponse.redirect(new URL("/private", req.nextUrl.origin));
    }

    //Middleware Function to authenticate the user
    const response = await MiddleWareAuth(req) ;
    return response ?? NextResponse.next();    
  }catch{
    return NextResponse.error();
  }
}


async function MiddleWareAuth(req:NextRequest){

  //Condition to check if its a user
  if(privateRoutes.includes(req.nextUrl.pathname)){
    const user = await verifySession();
    if(!user){
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin)); 
    }
  }

  //Condition to check if its a admin
  if(adminroutes.includes(req.nextUrl.pathname)){
    const admin = await verifySession();
    if(admin===null){
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin)); 

    }
    if(admin.role !=="admin"){
      return NextResponse.redirect(new URL("/", req.nextUrl.origin)); 

    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}