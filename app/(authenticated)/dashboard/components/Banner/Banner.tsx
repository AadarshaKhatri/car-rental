const Banner = () => {
  return (
    <div className="w-full md:h-72 relative rounded-xl overflow-hidden  shadow-xl flex
    flex-col md:flex-row items-center justify-between px-5 md:px-10 text-white">
   

      {/* Left Content */}
      <div className="flex flex-col space-y-4 md:max-w-xl z-10">
        <span className="text-xs md:text-sm bg-white/10 text-primary px-3 py-1 rounded-full w-max font-medium tracking-wide shadow">
          🚘 Full Stack Project
        </span>

        <h2 className="text-2xl font-extrabold leading-tight text-white drop-shadow-md">
          Car Rental System
        </h2>

        <p className="text-base text-white/70 leading-relaxed">
          A car rental management system where you can list your vehicles for rent in a shared marketplace and book the perfect ride for yourself!
        </p>

        <p className="text-primary font-semibold text-sm md:text-md cursor-pointer hover:underline transition-all duration-200">
          Explore Now →
        </p>
      </div>

      {/* Right SVG Icon */}
      <div className="hidden md:flex w-1/3 justify-center items-center z-10">
        <h2 className="text-[200px]">🏎️</h2>
      </div>
    </div>
  );
};

export default Banner;
