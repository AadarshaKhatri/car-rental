import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";

const CreateCarForm = () => {
  return (
    <section>
      <div className="flex flex-col justify-center items-center gap-y-8">
            <form className="w-full flex flex-col justify-center items-center gap-y-6">
              <Input placeholder="Enter the name of the car" className="w-full py-6" />

              <div className="flex flex-col md:flex-row w-full justify-center items-center gap-5">
                <Input placeholder="Brand" className="w-full py-6" />
                <Input placeholder="Mileage" className="w-full py-6" />
                <Input placeholder="Type" className="w-full py-6" />
              </div>

              <Select required>
                <SelectTrigger className="w-full py-6 bg-gray-800 text-white border border-muted rounded-md">
                  <SelectValue placeholder="Select Transmission Type" />
                </SelectTrigger>
                <SelectContent className="w-full bg-gray-900 border border-muted rounded-md shadow-lg">
                  <SelectGroup>
                    <SelectItem value="MANUAL" className="px-6 py-2 cursor-pointer hover:bg-gray-100">
                      Manual
                    </SelectItem>
                    <SelectItem value="AUTO" className="px-6 py-2 cursor-pointer hover:bg-gray-100">
                      Auto
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button className="py-6">Create Car</Button>
            </form>
          </div>
    </section>
  )
}

export default CreateCarForm