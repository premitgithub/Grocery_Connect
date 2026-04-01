// import React from "react";
// import { useLocation } from "react-router-dom";

// const SearchResultsPage = () => {
//   const { search } = useLocation();
//   const params = new URLSearchParams(search);
//   const query = params.get("query") || "";

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center text-center px-5">
//       <h1 className="text-3xl font-bold text-teal-700">
//         Search Results for: "{query}"
//       </h1>
//       <p className="text-gray-600 mt-3">
//         (Here you can show matching products, shops, etc.)
//       </p>
//     </div>
//   );
// };

// export default SearchResultsPage;
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { shops } from "../data/dummyShops";

const BASE = "http://localhost:5000/api";

const SearchResultsPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const query = params.get("query")?.toLowerCase().trim() || "";

  const [loading, setLoading] = useState(true);
  const [noMatch, setNoMatch] = useState(false);

  useEffect(() => {
    if (!query) return;

    const searchAll = async () => {
      try {
        setLoading(true);

        // --- 1️⃣ Fetch products from backend ---
        const res = await fetch(`${BASE}/products`);
        const products = await res.json();

        // --- 2️⃣ Try Product Match ---
        const matchedProduct = products.find((p) =>
          p.name.toLowerCase().includes(query)
        );
        if (matchedProduct) {
          navigate(`/products/${encodeURIComponent(matchedProduct.name)}`);
          return;
        }

        // --- 3️⃣ Try Category Match ---
        const matchedCategory = products.find(
          (p) => p.category.toLowerCase() === query
        );
        if (matchedCategory) {
          navigate(
            `/products/category/${encodeURIComponent(matchedCategory.category)}`
          );
          return;
        }

        // --- 4️⃣ Try Shop Match (from dummyShops.js) ---
        const matchedShop = shops.find((shop) =>
          shop.shopName.toLowerCase().includes(query)
        );
        if (matchedShop) {
          navigate(
            `/shops/${encodeURIComponent(
              matchedShop.shopName.replace(/\s+/g, "-")
            )}`
          );
          return;
        }

        // --- 5️⃣ No Match Found ---
        setNoMatch(true);
      } catch (err) {
        console.error("Search Error:", err);
        setNoMatch(true);
      } finally {
        setLoading(false);
      }
    };

    searchAll();
  }, [query, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-teal-700">
          Searching for “{query}”...
        </h1>
        <p className="text-gray-600 mt-3">Please wait while we find matches.</p>
      </div>
    );
  }

  if (noMatch) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          No Results Found
        </h1>
        <p className="text-gray-600">
          Couldn’t find any product, category, or shop matching “{query}”.
        </p>
      </div>
    );
  }

  return null; // Redirection happens automatically before this
};

export default SearchResultsPage;
