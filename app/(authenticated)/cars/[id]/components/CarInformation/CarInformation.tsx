import { getUserId } from "@/app/(notauthenticated)/session";
import CarDetails from "../CarDetails/CarDetails";
import TicketDetails from "../TicketDetails/TicketDetails";





const CarInformation = async () => {
  const userId = await getUserId();
  console.log(userId);
    return (
    <section className="w-full flex justify-center items-center pb-20">
      <div className="flex flex-col justify-center items-center">
      
      <CarDetails/>
      <TicketDetails/>
      </div>
    </section>
  );
};

export default CarInformation;
