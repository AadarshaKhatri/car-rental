import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from "axios";
import { useEffect, useState } from "react"

interface UserModel{
  name:string,
  id:string,
  email:string,

}
const Heading = () => {
  const [user,setUser] = useState<UserModel>();

  useEffect(()=>{
    async function FetchData() {
      const {data} = await axios.get("/api/getUserInformation")
        setUser(data);      
    }
    FetchData();
  },[])

  console.log("User Information",user);
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
    <div>
      <h1 className="text-3xl font-bold text-primary">Profile Overview</h1>
      <p className="text-muted-foreground">Detailed stats and performance breakdown</p>
    </div>
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://cdn-images.dzcdn.net/images/cover/35b093d22fe1539003d5d18dd8f309eb/0x1900-000000-80-0-0.jpg" />
        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-semibold text-primary">{user?.name}</h4>
        <p className="text-muted-foreground text-xs">{user?.email}</p>
      </div>
    </div>
  </div>
  )
}

export default Heading