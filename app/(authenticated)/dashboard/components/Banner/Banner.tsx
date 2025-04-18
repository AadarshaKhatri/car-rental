const Banner = () => {
  return (
    <div className="w-full h-72 relative rounded-xl overflow-hidden  shadow-xl flex items-center justify-between px-10 text-white">
      {/* Glow / Accent Circle */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/30 rounded-full blur-3xl opacity-20 z-0"></div>

      {/* Left Content */}
      <div className="flex flex-col space-y-4 max-w-xl z-10">
        <span className="text-sm bg-white/10 text-primary px-3 py-1 rounded-full w-max font-medium tracking-wide shadow">
          🚘 Full Stack Project
        </span>

        <h2 className="text-4xl font-extrabold leading-tight text-white drop-shadow-md">
          Car Rental System
        </h2>

        <p className="text-base text-white/70 leading-relaxed">
          A car rental management system where you can list your vehicles for rent in a shared marketplace and book the perfect ride for yourself!
        </p>

        <p className="text-primary font-semibold text-lg cursor-pointer hover:underline transition-all duration-200">
          Explore Now →
        </p>
      </div>

      {/* Right SVG Icon */}
      <div className="hidden md:flex w-1/3 justify-center items-center z-10">
        <h2 className="text-[200px]">🏎️</h2>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/30 via-transparent to-primary/30 blur-sm" />
    </div>
  );
};

export default Banner;
