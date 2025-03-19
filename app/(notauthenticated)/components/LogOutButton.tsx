import { Button } from "@/components/ui/button"
import { deleteSession } from "../session"



const LogOutButton = () => {
  return (
    <Button className="bg-red-500" onClick={deleteSession}>Log Out</Button>

  )
}

export default LogOutButton