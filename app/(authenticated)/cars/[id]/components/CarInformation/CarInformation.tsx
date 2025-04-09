import { getUserId } from "@/app/(notauthenticated)/session";
import CarDetails from "../CarDetails/CarDetails";
import TicketDetails from "../TicketDetails/TicketDetails";
import { redirect } from "next/navigation";





const CarInformation = async () => {
  const userId = await getUserId();
 if(!userId) return redirect("/login");
    return (
    <section className="w-full flex justify-center items-center pb-20">
      <div className="flex flex-col justify-center items-center">
      
      <CarDetails id={userId}/>
      <TicketDetails id={userId}/>
      </div>
    </section>
  );
};

export default CarInformation;
