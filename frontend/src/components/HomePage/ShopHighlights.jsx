import { useState, useRef } from "react";
import { shops } from "../../data/dummyShops"; // adjust path as needed
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../../styles/homepage.css";

const ShopHighlights = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const openShopPage = (shop) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const encodedName = encodeURIComponent(shop.shopName);
    navigate(`/shops/${encodedName}`);
  };

  return (
    <section className="py-16 bg-white overflow-hidden relative">
      <h2 className="text-3xl font-bold text-center text-teal-900 mb-10">
        Featured Local Shops
      </h2>

      <div
        className="relative w-full overflow-hidden py-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={scrollRef}
          className={`flex gap-6 transition-all duration-500 shop-scroll ${
            isHovered ? "pause-scroll overflow-x-auto" : "animate-scroll"
          }`}
        >
          {[...shops, ...shops].map((shop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex-shrink-0 w-60 bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl hover:scale-[1.05] transition-all duration-300 mt-5 mb-10 cursor-pointer"
              onClick={() => openShopPage(shop)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") openShopPage(shop);
              }}
            >
              {/* Shop Image */}
              <div className="relative">
                <img
                  src={
                    shop.shopImage ||
                    "https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
                  }
                  alt={shop.shopName}
                  className="w-full h-52 object-cover"
                />
              </div>

              {/* Shop Info */}
              <div className="p-4 space-y-2 text-center">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {shop.shopName}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {shop.shopDescription || "Quality groceries and essentials"}
                </p>
                <p className="text-sm text-teal-600 font-semibold">
                  {shop.shopStatus}
                </p>

                <button
                  className="mt-2 px-4 py-2 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card click
                    openShopPage(shop);
                  }}
                >
                  View Shop
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Arrows */}
        {isHovered && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-6 top-1/2 cursor-pointer transform -translate-y-1/2 text-teal-900 hover:scale-125 transition-transform duration-300 z-10"
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
              className="absolute right-6 top-1/2 cursor-pointer transform -translate-y-1/2 text-teal-900 hover:scale-125 transition-transform duration-300 z-10"
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
