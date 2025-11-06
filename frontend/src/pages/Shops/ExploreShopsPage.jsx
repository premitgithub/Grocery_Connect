import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import ShopList from "../../components/Shops/ShopList";
import ShopFilter from "../../components/Shops/ShopFilter";
import { shops as allShops } from "../../data/dummyShops";
import AnimatedTagline from "../../animations/AnimatedTagline";

const ExploreShopsPage = () => {
  const [filters, setFilters] = useState({
    category: "All",
    openOnly: false,
    location: "",
    search: "",
  });

  const [showFilters, setShowFilters] = useState(false); // 👈 mobile filter drawer toggle

  // filter logic
  const filteredShops = useMemo(() => {
    return allShops.filter((s) => {
      if (filters.category && filters.category !== "All") {
        const cats = (s.categories || []).map((c) => String(c).toLowerCase());
        if (!cats.includes(filters.category.toLowerCase())) return false;
      }

      if (filters.openOnly) {
        if ((s.shopStatus || "").toLowerCase() !== "open") return false;
      }

      if (filters.location && filters.location.trim() !== "") {
        const q = filters.location.trim().toLowerCase();

        const street = String(s.address?.street || "").toLowerCase();
        const area = String(s.address?.area || "").toLowerCase();
        const city = String(s.address?.city || "").toLowerCase();
        const pincode = String(s.address?.pinCode || "").toLowerCase();

        if (
          !street.includes(q) &&
          !area.includes(q) &&
          !city.includes(q) &&
          !pincode.includes(q)
        ) {
          return false;
        }
      }

      if (filters.search && filters.search.trim() !== "") {
        const q = filters.search.trim().toLowerCase();
        const inName = String(s.shopName || "")
          .toLowerCase()
          .includes(q);
        const inDesc = String(s.shopDescription || "")
          .toLowerCase()
          .includes(q);
        if (!inName && !inDesc) return false;
      }

      return true;
    });
  }, [filters]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReset = () =>
    setFilters({
      category: "All",
      openOnly: false,
      location: "",
      search: "",
    });

  return (
    <section className="px-4 sm:px-8 md:px-14 py-14 bg-gradient-to-b from-teal-50 to-emerald-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-800 tracking-tight">
          Explore Local Shops
        </h1>
        <AnimatedTagline />
      </motion.div>

      {/* Mobile Filter Button */}
      <div className="flex justify-end mb-6 md:hidden">
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 px-4 py-3 text-teal-700 border border-teal-300 rounded-xl hover:bg-teal-100 transition-all"
        >
          <FiFilter className="text-xl" /> Filters
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* === Sidebar (desktop) === */}
        <motion.aside
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block md:w-1/4"
        >
          <div className="bg-white/90 rounded-2xl shadow-2xl p-6 sticky top-20">
            <ShopFilter
              initialFilters={filters}
              onApply={setFilters}
              onReset={handleReset}
            />
          </div>
        </motion.aside>

        {/* === Shop list (right) === */}
        <motion.div
          layout
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <ShopList shops={filteredShops} />
        </motion.div>
      </div>

      {/* === Mobile Filter Drawer === */}
      <AnimatePresence>
        {showFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
            />

            {/* Drawer panel */}
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[80%] bg-white z-50 shadow-2xl p-6 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-teal-700">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-sm text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>

              <ShopFilter
                initialFilters={filters}
                onApply={(newFilters) => {
                  setFilters(newFilters);
                  setShowFilters(false);
                }}
                onReset={() => {
                  handleReset();
                  setShowFilters(false);
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExploreShopsPage;
