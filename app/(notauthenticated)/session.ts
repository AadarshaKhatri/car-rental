import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { sessionSchema } from '@/lib/schemas'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { redirect } from 'next/navigation'
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
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch {
    console.log('Failed to verify session',)
  }
}


export async function createSession(id:number, role:string) {
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
  const cookieStore = await cookies()
  cookieStore.delete('session')
}



 
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/login')
  }
  return { role:session.role, userId: session.userId }
})


export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null
 
  try {
    const data = await prisma.user_model.findMany({
      where: {
        id:session.userId,
      }
      
    })
 
    const user = data[0]
    return user
  } catch  {
    console.log('Failed to fetch user')
    return null
  }
})