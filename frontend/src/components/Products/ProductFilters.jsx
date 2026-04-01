// src/components/Products/ProductFilters.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";

const ProductFilters = ({
  categories = [],
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  searchQ,
  setSearchQ,
  products = [],
}) => {
  // compute min/max price from products
  const [minPriceAll, maxPriceAll] = useMemo(() => {
    if (!products.length) return [0, 1000];
    const prices = products.map((p) => Number(p.price || 0));
    return [Math.min(...prices), Math.max(...prices)];
  }, [products]);

  // keep UI friendly defaults
  const localMin = priceRange?.[0] ?? minPriceAll;
  const localMax = priceRange?.[1] ?? maxPriceAll;

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat))
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    else setSelectedCategories([...selectedCategories, cat]);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border dark:border-slate-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
    >
      <div className="mb-4">
        <input
          type="search"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          placeholder="Search products..."
          className="w-full border dark:border-slate-600 dark:bg-slate-900 rounded-lg px-3 py-4 text-lg focus:ring-2 focus:ring-teal-400 outline-none"
        />
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-2xl mb-2">Category</h4>
        <div className="flex flex-col gap-2 overflow-auto pr-1">
          {categories.length === 0 ? (
            <div className="text-gray-500">No categories</div>
          ) : (
            categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="cursor-pointer"
                />
                <span className="text-lg">{cat}</span>
              </label>
            ))
          )}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2 text-2xl">Price (₹)</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={localMin}
            min={minPriceAll}
            max={localMax}
            onChange={(e) =>
              setPriceRange([Number(e.target.value || 0), localMax])
            }
            className="w-1/2 border dark:border-slate-600 dark:bg-slate-900 rounded-lg px-3 text-lg py-4 focus:ring-2 focus:ring-teal-400 outline-none"
          />
          <input
            type="number"
            value={localMax}
            min={localMin}
            max={maxPriceAll}
            onChange={(e) =>
              setPriceRange([localMin, Number(e.target.value || maxPriceAll)])
            }
            className="w-1/2 border dark:border-slate-600 dark:bg-slate-900 rounded-lg px-3 text-lg py-4 focus:ring-2 focus:ring-teal-400 outline-none"
          />
        </div>
        <p className="text-md text-gray-500 mt-2">
          Range: ₹{minPriceAll} — ₹{maxPriceAll}
        </p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2 text-2xl">Minimum Rating</h4>
        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full border dark:border-slate-600 dark:bg-slate-900 rounded-lg px-3 py-4 focus:ring-2 focus:ring-teal-400 cursor-pointer outline-none"
        >
          <option value={0}>Any</option>
          <option value={1}>1 ★+</option>
          <option value={2}>2 ★+</option>
          <option value={3}>3 ★+</option>
          <option value={4}>4 ★+</option>
          <option value={4.5}>4.5 ★+</option>
        </select>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => {
            setSelectedCategories([]);
            setPriceRange([minPriceAll, maxPriceAll]);
            setMinRating(0);
            setSearchQ("");
          }}
          className="flex-1 border dark:border-slate-600 px-3 py-4 text-2xl rounded-lg hover:bg-teal-500 dark:hover:bg-teal-600 duration-400 cursor-pointer transition-colors"
        >
          Reset
        </button>
      </div>
    </motion.div>
  );
};

export default ProductFilters;
