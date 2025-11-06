import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ShopFilter = ({
  initialFilters = {},
  onApply = () => {},
  onReset = () => {},
}) => {
  const [category, setCategory] = useState(initialFilters.category || "All");
  const [openOnly, setOpenOnly] = useState(initialFilters.openOnly || false);
  const [location, setLocation] = useState(initialFilters.location || "");
  const [search, setSearch] = useState(initialFilters.search || "");

  useEffect(() => {
    setCategory(initialFilters.category ?? "All");
    setOpenOnly(initialFilters.openOnly ?? false);
    setLocation(initialFilters.location ?? "");
    setSearch(initialFilters.search ?? "");
  }, [initialFilters]);

  const handleApply = () => {
    onApply({
      category,
      openOnly,
      location,
      search,
    });
  };

  const handleReset = () => {
    setCategory("All");
    setOpenOnly(false);
    setLocation("");
    setSearch("");
    onReset();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <h3 className="text-3xl font-semibold text-teal-800 mb-4 text-center">
        Filters
      </h3>

      {/* Search */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Search
        </label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search shops or items..."
          className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-teal-300 focus:outline-none"
        />
      </div>

      {/* Category */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-teal-300 focus:outline-none cursor-pointer"
        >
          <option value="All">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Snacks">Snacks</option>
          <option value="Drinks">Drinks</option>
          <option value="Edible_Oils">Edible Oils</option>
          <option value="Household">Household</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Location */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          City / Area / Pincode
        </label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Kolkata, Salt Lake, 700019"
          className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:ring-2 focus:ring-teal-300 focus:outline-none"
        />
      </div>

      {/* Open now */}
      <div className="mb-6 flex items-center gap-3">
        <input
          id="openNow"
          type="checkbox"
          checked={openOnly}
          onChange={(e) => setOpenOnly(e.target.checked)}
          className="w-4 h-6 accent-teal-600"
        />
        <label htmlFor="openNow" className="text-lg text-gray-700 font-medium">
          Open Now
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-10">
        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={handleApply}
          className="flex-1 bg-teal-600 text-lg cursor-pointer text-white py-3 rounded-xl font-semibold"
        >
          Apply
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={handleReset}
          className="flex-1 bg-white border text-lg cursor-pointer border-gray-300 py-3 rounded-xl font-medium"
        >
          Reset
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ShopFilter;
