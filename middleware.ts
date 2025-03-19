import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./app/(notauthenticated)/session";


const privateRoutes = ["/private"]
const adminroutes = ["/admin"]
export async function middleware(req:NextRequest){
  try{

    const response = await MiddleWareAuth(req) ;

    return response ?? NextResponse.next();
    
  }catch(error){
    return error
  }
}


async function MiddleWareAuth(req:NextRequest){
  if(privateRoutes.includes(req.nextUrl.pathname)){
    const user = await verifySession();
    if(!user){
      return NextResponse.redirect(new URL("/login"))
    }
  }

  if(adminroutes.includes(req.nextUrl.pathname)){
    const admin = await verifySession();
    if(!admin){
      return NextResponse.redirect(new URL("/login"))
    }
    if(admin.role !=="admin"){
      return NextResponse.redirect(new URL("/"));
    }
  }
}


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}