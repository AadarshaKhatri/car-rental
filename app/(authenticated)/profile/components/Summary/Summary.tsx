import { Lightbulb } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";

const FunFactCard = () => {

  const [fact,setFacts] = useState<string>();
  useEffect(()=>{
    async function FetchData(){
      const {data} = await axios.get("/api/getFact");
      if(data) setFacts(data);
    }
    FetchData();
  },[])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <CardTitle>Discover a Fun Fact About the Platform</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-full flex items-center justify-center p-10">
        <p className="text-md text-primary text-center">
          {fact}
        </p>
      </CardContent>
    </Card>
  );
};

export default FunFactCard;
