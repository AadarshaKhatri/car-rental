import CreateCarForm from "./components/CreateCarForm";


const YourCars = () => {
  return (
    <section className="container max-w-full mx-auto px-4 md:px-40 mt-5">
      <div className="w-full flex flex-col md:flex-row justify-between items-stretch gap-6">
        {/* Left Section */}
        <div className="w-full md:w-[400px] flex flex-col">
          <h2 className="text-2xl font-semibold text-white">Create your car for rent</h2>
        </div>

        {/* Right Section - Takes Remaining Space */}
        <div className="flex-1 min-w-0 flex flex-col">
         <CreateCarForm/>
        </div>
      </div>
    </section>
  );
};

export default YourCars;
