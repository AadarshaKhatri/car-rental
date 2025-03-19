import bcrypt from "bcryptjs"

export async function hashpassword(inputpassword:string) : Promise<string>{
  return bcrypt.hash(inputpassword,10);
}

export async function verifyPassword(inputpassword:string,db_password:string) : Promise<boolean>{
  const msg= bcrypt.compare(inputpassword,db_password);
  return msg
}