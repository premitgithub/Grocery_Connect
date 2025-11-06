import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedHeroText from './../../animations/AnimatedHeroText';


const HeroSection = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 md:px-20 py-12 md:py-20 bg-gradient-to-r from-teal-100 via-white to-emerald-100 overflow-hidden">
      {/* Left Text Section */}
      <div className="max-w-2xl text-center md:text-left space-y-6 md:space-y-8">
        <AnimatedHeroText/>

        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 sm:gap-6 pt-4">
          <Link to="/shops">
            <button className="px-6 py-4 bg-teal-600 text-white text-lg sm:text-xl font-semibold rounded-3xl hover:bg-teal-800 transition cursor-pointer duration-500 shadow-md">
              Explore Shops
            </button>
          </Link>
          <button className="px-6 py-4 text-lg sm:text-xl border border-teal-600 text-teal-700 font-semibold rounded-3xl hover:bg-white hover:shadow-md transition duration-500">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Side Images */}
      <div className="flex flex-col items-center mt-12 md:mt-0 space-y-4">
        {/* Top row */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <img
            src="/logos/shopping.gif"
            alt="Shopping"
            className="w-32 sm:w-40 md:w-48 lg:w-95 drop-shadow-lg mix-blend-multiply"
          />
          <ArrowRight size={36} className="text-teal-700 hidden md:block" />
          <img
            src="/logos/delivery.gif"
            alt="Delivery"
            className="w-32 sm:w-40 md:w-48 lg:w-95 drop-shadow-lg mix-blend-multiply"
          />
        </div>

        {/* Down arrow */}
        <ArrowDown
          size={36}
          className="text-teal-700 my-3 md:my-5 animate-bounce-slow"
        />

        {/* Bottom image */}
        <img
          src="/logos/man-ringing.gif"
          alt="Delivery Man"
          className="w-36 sm:w-44 md:w-52 lg:w-95 drop-shadow-xl mix-blend-multiply"
        />
      </div>
    </section>
  );
};

export default HeroSection;
