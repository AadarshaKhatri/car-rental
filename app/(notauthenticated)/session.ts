import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { sessionSchema } from '@/lib/schemas'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { cache } from 'react'
import prisma from '@/lib/prisma'


const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: z.infer<typeof sessionSchema>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    if(session){
      const { payload } = await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
      })
      return payload
    }else{
      return null
    }
  } catch {
   return null
  }
}


export async function createSession(id:string, role:string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ id,role,expiresAt})
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}


export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session'); // Only pass the cookie name
}

 
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  return { role:session?.role, userId: session?.id }
})


export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null
 
  try {
    const data = await prisma.user_model.findUnique({
      where: {
        id:String(session?.userId),
      }
      
    })
    return data
  } catch  {
    console.log('Failed to fetch user')
    return null
  }
})