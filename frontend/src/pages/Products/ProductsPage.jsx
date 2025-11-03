import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import ProductCard from "../../components/Products/ProductCard";
import ProductFilters from "../../components/Products/ProductFilters";
import { fetchProducts } from "../../api/product";
import toast from "react-hot-toast";

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [searchQ, setSearchQ] = useState("");

  // mobile filter panel
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetchProducts({ signal: controller.signal })
      .then((list) => setProducts(list))
      .catch((err) => {
        console.error(err);
        toast.error("Couldn't load products");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.category && set.add(p.category));
    return Array.from(set).sort();
  }, [products]);

  // filtering logic
  useEffect(() => {
    let out = [...products];

    if (searchQ.trim()) {
      const q = searchQ.toLowerCase();
      out = out.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q) ||
          (p.brand || "").toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length) {
      out = out.filter((p) => selectedCategories.includes(p.category));
    }

    const [minP, maxP] = priceRange;
    out = out.filter((p) => {
      const price = Number(p.price || 0);
      return price >= minP && price <= maxP;
    });

    if (minRating > 0) {
      out = out.filter((p) => (p.rating || 0) >= minRating);
    }

    if (sortBy === "price-asc") out.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") out.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating-desc")
      out.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    setFiltered(out);
  }, [products, selectedCategories, priceRange, minRating, sortBy, searchQ]);

  const filters = {
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    sortBy,
    setSortBy,
    searchQ,
    setSearchQ,
    categories,
    products,
  };

  const handleCardClick = (product) => console.log("view", product);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50 py-6 px-4">
      <div className="flex flex-col lg:flex-row w-full gap-10">
        {/* === Sidebar for large screens === */}
        <aside className="hidden lg:block lg:w-1/4 xl:w-1/5 bg-white ml-10 shadow-md rounded-2xl p-5 h-fit sticky top-20 self-start">
          <h1 className="text-3xl font-semibold flex ml-30 mb-5 text-teal-700">
            Filters
          </h1>

          <ProductFilters {...filters} />
        </aside>

        {/* === Main section === */}
        <section className="flex-1 relative">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-teal-700">
              Explore Our Products{" "}
              <span className="text-gray-500 text-lg font-medium">
                ({filtered.length})
              </span>
            </h1>

            {/* Filter toggle for mobile */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-5 py-4 mr-12 text-xl focus:ring-2 focus:ring-teal-400 cursor-pointer"
              >
                <option value="">Sort</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating-desc">Top Rated</option>
              </select>
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-1 border px-3 py-2 rounded-lg text-sm text-teal-700 hover:bg-teal-100 transition"
              >
                <FiFilter className="text-lg" /> Filters
              </button>
            </div>
          </div>

          {/* Products grid */}
          {loading ? (
            <div className="text-center py-30 text-gray-500 text-lg">
              Loading products…
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-500 text-lg">
              No products match your filters.
            </div>
          ) : (
            <motion.div
              layout
              className="grid mr-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
            >
              <AnimatePresence>
                {filtered.map((p) => (
                  <motion.div
                    key={p._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProductCard product={p} onClick={handleCardClick} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </div>

      {/* === Mobile Filter Drawer === */}
      <AnimatePresence>
        {showFilters && (
          <>
            {/* backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
            />
            {/* panel */}
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[80%] bg-white z-50 shadow-lg p-5 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-teal-700">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-sm text-gray-500 hover:text-gray-800"
                >
                  Close ✕
                </button>
              </div>
              <ProductFilters {...filters} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;
