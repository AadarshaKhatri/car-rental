import bcrypt from "bcryptjs"

export async function hashpassword(inputpassword:string) : Promise<string>{
  return bcrypt.hash(inputpassword,10);
}

export async function verifyPassword(inputpassword:string,db_password:string) : Promise<boolean>{
  return bcrypt.compare(inputpassword,db_password);
}