import { useState, useRef } from "react";
import "../../styles/homepage.css";

const shops = [
  {
    name: "Fresh Mart",
    location: "Downtown",
    img: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
  },
  {
    name: "Daily Needs",
    location: "Green Street",
    img: "https://cdn-icons-png.flaticon.com/512/2972/2972188.png",
  },
  {
    name: "Family Grocery",
    location: "Lake View",
    img: "https://cdn-icons-png.flaticon.com/512/2972/2972217.png",
  },
  {
    name: "Super Grocers",
    location: "East End",
    img: "https://cdn-icons-png.flaticon.com/512/2972/2972183.png",
  },
  {
    name: "Green Basket",
    location: "Market Street",
    img: "https://cdn-icons-png.flaticon.com/512/2972/2972187.png",
  },
  {
    name: "Daily Fresh",
    location: "West Town",
    img: "https://cdn-icons-png.flaticon.com/512/2972/2972189.png",
  },
];

const ShopHighlights = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-white overflow-hidden relative">
      <h2 className="text-3xl font-bold text-center text-teal-900 mb-10">
        Featured Local Shops
      </h2>

      <div
        className="relative w-full py-6 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Scrolling Container */}
        <div
          ref={scrollRef}
          className={`flex gap-6  transition-all duration-500 shop-scroll ${
            isHovered ? "pause-scroll overflow-x-auto" : "animate-scroll"
          }`}
        >
          {[...shops, ...shops].map((shop, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 bg-teal-50 rounded-2xl shadow-gray-400 mt-5 mb-10 p-10 hover:shadow-lg hover:scale-[1.05] transition duration-400"
            >
              <img
                src={shop.img}
                alt={shop.name}
                className="w-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-teal-800 text-center">
                {shop.name}
              </h3>
              <p className="text-gray-600 font-medium text-center">
                {shop.location}
              </p>
              <button className="mt-4 px-4 py-3 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition duration-500 mx-auto block font-semibold cursor-pointer">
                View Shop
              </button>
            </div>
          ))}
        </div>

        {/* Arrows */}
        {isHovered && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-teal-900 cursor-pointer hover:scale-125 transition-transform duration-300 z-10"
              aria-label="Scroll left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-14 h-14"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={() => scroll("right")}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 cursor-pointer text-teal-900 hover:scale-125 transition-transform duration-300 z-10"
              aria-label="Scroll right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-14 h-14"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}

        {/* Fade Edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export default ShopHighlights;


