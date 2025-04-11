import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Heading = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
    <div>
      <h1 className="text-3xl font-bold text-primary">Analytics Overview</h1>
      <p className="text-muted-foreground">Detailed stats and performance breakdown</p>
    </div>
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="/avatar.png" />
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-semibold text-primary">Aadarsha Khatri</h4>
        <p className="text-muted-foreground text-sm">Owner</p>
      </div>
    </div>
  </div>
  )
}

export default Heading