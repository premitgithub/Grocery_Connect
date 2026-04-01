import { useEffect, useState, useRef } from "react";
import "../../styles/homepage.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TopProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);

  const navigate = useNavigate();

  const handleNameClick = (product) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const encodedName = encodeURIComponent(product.name);
    navigate(`/products/${encodedName}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        Loading products...
      </div>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-slate-900 overflow-hidden relative transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center text-teal-900 dark:text-teal-100 mb-10 transition-colors duration-300">
        Trending Products
      </h2>

      <div
        className="relative w-full overflow-hidden py-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={scrollRef}
          className={`flex gap-6 transition-all duration-500 product-scroll ${
            isHovered
              ? "pause-scroll overflow-x-auto"
              : "animate-scroll-reverse"
          }`}
        >
          {[...products, ...products].map((product, index) => (
            <motion.div
              key={`${product._id || "no-id"}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex-shrink-0 w-60 bg-white dark:bg-slate-800 shadow-md rounded-2xl overflow-hidden hover:shadow-xl hover:scale-[1.05] transition-all duration-300 mt-5 mb-10 cursor-pointer"
              onClick={() => handleNameClick(product)}
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : "/groceries/default.png"
                  }
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />
                {product.brand && (
                  <div className="absolute top-4 left-4 bg-white/70 dark:bg-slate-900/70 px-3 py-1 rounded-full text-sm font-semibold dark:text-white">
                    {product.brand}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2 text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {product.description || "High-quality grocery item"}
                </p>
                <p className="text-xl font-bold text-teal-700 dark:text-teal-400">
                  ₹{product.price}
                </p>

                <button
                  className="mt-2 px-4 py-2 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNameClick(product);
                  }}
                >
                  View Product
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
              className="absolute left-6 top-1/2 cursor-pointer transform -translate-y-1/2 text-teal-900 dark:text-teal-200 hover:scale-125 transition-transform duration-300 z-10"
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
              className="absolute right-6 top-1/2 cursor-pointer transform -translate-y-1/2 text-teal-900 dark:text-teal-200 hover:scale-125 transition-transform duration-300 z-10"
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
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white dark:from-slate-900 to-transparent pointer-events-none transition-colors duration-300"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none transition-colors duration-300"></div>
      </div>
    </section>
  );
};

export default TopProductsSection;
