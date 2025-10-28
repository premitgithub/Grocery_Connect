import { ArrowRight, ArrowDown } from "lucide-react"; // uses lucide icons (built-in with Tailwind setup)

const HeroSection = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between md:px-20 bg-gradient-to-r from-teal-100 via-white to-emerald-100 overflow-hidden">
      {/* Left Text */}
      <div className="max-w-2xl space-y-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-900 leading-snug">
          Supporting <span className="text-teal-600">Local Grocery Stores</span>{" "}
          in the Digital Era is what we{" "}
          <span className="text-teal-600">AIM FOR</span>
        </h1>
        <p className="text-gray-700 text-xl md:text-2xl">
          Grocery Connect helps small grocery shops reach more customers —
          allowing users to find nearby stores that sell their favorite
          products.
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          <button className="px-6 py-5 bg-teal-600 text-white text-2xl cursor-pointer font-semibold rounded-3xl hover:bg-teal-900 transition duration-700">
            Explore Shops
          </button>
          <button className="px-6 py-3 text-2xl cursor-pointer border border-teal-600 text-teal-700 font-semibold rounded-3xl hover:bg-white transition duration-700">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Section with images */}
      <div className="flex flex-col items-center mt-12 md:mt-0">
        {/* Top row: 2 images with arrow in between */}
        <div className="flex items-center space-x-6">
          <img
            src="/logos/shopping.gif"
            alt="Shopping"
            className="w-130 md:w-100 drop-shadow-lg mix-blend-multiply"
          />
          <ArrowRight size={40} className="text-teal-700 hidden md:block" />
          <img
            src="/logos/delivery.gif"
            alt="Delivery"
            className="w-40 md:w-100 drop-shadow-lg mix-blend-multiply"
          />
        </div>

        {/* Down arrow and bottom image */}
        <ArrowDown
          size={40}
          className="text-teal-700 my-4 animate-bounce-slow"
        />
        <img
          src="/logos/man-ringing.gif"
          alt="Delivery Man"
          className="w-44 md:w-110 drop-shadow-xl mix-blend-multiply"
        />
      </div>
    </section>
  );
};

export default HeroSection;

