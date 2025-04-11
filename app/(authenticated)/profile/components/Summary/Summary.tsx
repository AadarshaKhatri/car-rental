import { ImageIcon, Rocket
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


const Summary = () => {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Social Summary</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center text-sm">
          <ImageIcon className="w-4 h-4 text-purple-500" />
          <span>239 Pictures</span>
        </div>
        <button className="text-xs text-blue-600 underline">Download</button>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center text-sm">
          <Rocket className="w-4 h-4 text-pink-500" />
          <span>5,453 Followers</span>
        </div>
        <button className="text-xs text-blue-600 underline">Find More</button>
      </div>
    </CardContent>
  </Card>
  )
}

export default Summary