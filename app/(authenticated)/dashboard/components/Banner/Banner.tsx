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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-40 h-40 text-white/90 hover:text-white/60 transition"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M5.5 16c.828 0 1.5.672 1.5 1.5S6.328 19 5.5 19 4 18.328 4 17.5 4.672 16 5.5 16zm13 0c.828 0 1.5.672 1.5 1.5S19.328 19 18.5 19s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zM6.92 6l1.2-2h7.76l1.2 2H20c.552 0 1 .448 1 1v7c0 .552-.448 1-1 1h-.348a2.5 2.5 0 00-4.905 0H9.253a2.5 2.5 0 00-4.905 0H4c-.552 0-1-.448-1-1V7c0-.552.448-1 1-1h2.92zM6 8v3h12V8H6z" />
        </svg>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/30 via-transparent to-primary/30 blur-sm" />
    </div>
  );
};

export default Banner;
