import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import "../../styles/homepage.css";
import AnimatedCategoryLine from "../../animations/AnimatedCategoryLine";
import AnimatedCategoryHeader from "../../animations/AnimatedCategoryHeader";

const CategoryProductsPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");
  const [count, setCount] = useState(0);

  const controls = useAnimation();

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

  const filteredProducts = products
    .filter(
      (p) =>
        p.category &&
        p.category.toLowerCase() ===
          decodeURIComponent(categoryName).toLowerCase()
    )
    .sort((a, b) => {
      if (sortOption === "lowToHigh") return a.price - b.price;
      if (sortOption === "highToLow") return b.price - a.price;
      return 0;
    });

  // Animate number count up
  useEffect(() => {
    let start = 0;
    const end = filteredProducts.length;
    if (start === end) return;
    const duration = 1000; // 1s
    const stepTime = Math.abs(Math.floor(duration / end || 1));
    const timer = setInterval(() => {
      start += 1;
      setCount((prev) => (prev < end ? start : end));
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [filteredProducts.length]);

  const handleViewProduct = (product) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const encodedName = encodeURIComponent(product.name);
    navigate(`/products/${encodedName}`);
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        Loading products...
      </div>
    );
  }

  return (
    <section className="relative py-14 bg-white min-h-screen overflow-hidden">
      {/* --- Softer Gradient Banner --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          w-full max-w-3xl mx-auto 
          bg-gradient-to-r from-teal-100 via-emerald-100 to-teal-50 
          rounded-2xl flex items-center justify-center 
          mb-10 shadow-md 
          px-8 sm:px-10 py-10 sm:py-12 md:py-14 
          min-h-[10rem] sm:min-h-[14rem] md:min-h-[16rem] lg:min-h-[18rem]"
      >
        <div className="text-center w-full max-w-2xl break-words px-2 sm:px-6">
          <AnimatedCategoryHeader categoryName={categoryName} />
          <AnimatedCategoryLine categoryName={categoryName} />
        </div>
      </motion.div>

      {/* --- Product Container --- */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 py-10 bg-white border border-gray-200 shadow-xl rounded-3xl">
        {/* --- Toolbar --- */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          {/* Animated Count */}
          <motion.p
            key={count}
            initial={{ opacity: 1, y: -12 }}
            animate={{ opacity: 3, y: 4 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-gray-700 font-medium text-2xl"
          >
            {count} Products Found
          </motion.p>

          {/* Sort dropdown (only if products exist) */}
          {filteredProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-2xl px-6 py-3 text-base shadow-md text-gray-700 font-medium cursor-pointer focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300 pr-10 hover:scale-[1.02]"
                >
                  <option value="default">Sort by</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>

                {/* Chevron Icon */}
                <motion.span
                  animate={{ rotate: sortOption === "default" ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                >
                  ▼
                </motion.span>
              </div>
            </motion.div>
          )}
        </div>

        {/* --- Product Grid --- */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-teal-50 shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
                onClick={() => handleViewProduct(product)}
              >
                <div className="relative">
                  <img
                    src={product.images?.[0] || "/groceries/default.png"}
                    alt={product.name}
                    className="w-full h-52 object-cover"
                  />
                  {product.brand && (
                    <div className="absolute top-4 left-4 bg-white/70 px-3 py-1 rounded-full text-sm font-semibold">
                      {product.brand}
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 font-semibold">
                    ₹{product.price}
                  </p>
                  <button
                    onClick={() => handleViewProduct(product)}
                    className="mt-2 px-4 py-2 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition cursor-pointer"
                  >
                    View Product
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col items-center justify-start text-center m-10 w-full max-w-4xl mx-auto h-auto overflow-hidden rounded-2xl"
          >
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              No products found in this category 😔
            </p>
            <img
              src="/logos/empty-cart.png"
              alt="Empty"
              className="w-full max-w-3xl h-auto object-contain rounded-2xl opacity-90"
            />
          </motion.div>
        )}
      </div>

      {/* --- Fades & Back to Top --- */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-emerald-50 to-transparent pointer-events-none"></div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-teal-600 text-white text-4xl font-bold p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      >
        ↑
      </button>
    </section>
  );
};

export default CategoryProductsPage;
