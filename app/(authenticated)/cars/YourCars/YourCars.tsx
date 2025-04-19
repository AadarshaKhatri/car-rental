
import CarsTable from "./components/CarsTable";
import CreateCarForm from "./components/CreateCarForm";
import RentCarForm from "./components/RentCarForm";

const YourCars = () => {
  return (
    <section className="container mx-auto px-4 mt-5 max-w-full">
      <div className="flex flex-col justify-center items-center gap-10">

        {/* Cars Form Create Here */}
        <div className="w-full flex flex-col md:flex-row justify-between items-stretch gap-6 md:px-40">
          {/* Left Section */}
          <div className="w-full md:w-[400px] flex flex-col">
            <h2 className="text-2xl font-semibold text-white">Create your car for rent</h2>
          </div>

          {/* Right Section - Takes Remaining Space */}
          <div className="flex-1 min-w-0 flex flex-col">
            <CreateCarForm />
          </div>
        </div>

        {/* Make your car available for rental */}
        <div className="w-full flex flex-col md:flex-row justify-between items-stretch gap-6 md:px-40">
          {/* Left Section */}
          <div className="w-full md:w-[400px] flex flex-col">
            <h2 className="text-2xl font-semibold text-white">Make your car Available for rent</h2>
          </div>

          {/* Right Section - Takes Remaining Space */}
          <div className="flex-1 min-w-0 flex flex-col pb-30 md:pb-0">
            <RentCarForm/>
          </div>
        </div>

        {/* Collection of Own Cars */}
        <div className="w-full hidden md:flex flex-col items-center gap-6">
          <div className="w-full">
            <h3 className="text-2xl font-semibold text-white">Your Cars</h3>
          </div>

          <div className="w-full">
            <CarsTable/>
          </div>

        
        </div>

      </div>
    </section>
  );
};

export default YourCars;
