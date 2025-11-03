import { useEffect, useState } from "react";
import "../../styles/homepage.css";

const TopProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products"); // your API endpoint
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

  if (loading) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        Loading products...
      </div>
    );
  }

  return (
    <section className="py-16 bg-white overflow-hidden relative">
      <h2 className="text-3xl font-bold text-center text-teal-900 mb-10">
        Trending Products
      </h2>

      <div className="relative w-full overflow-hidden py-10">
        <div className="flex animate-scroll-reverse gap-6">
          {[...products, ...products].map((product, index) => (
            <div
              key={product._id || index}
              className="flex-shrink-0 w-56 bg-teal-50 rounded-2xl shadow-lg p-6 text-center hover:shadow-gray-400 hover:scale-[1.05] transition duration-300 "
            >
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : "/groceries/default.png"
                }
                alt={product.name}
                className="w-20 h-20 object-contain mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-teal-800">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-3 font-semibold">
                ₹{product.price}
              </p>
              <button className="px-4 py-3 bg-teal-600 text-white font-semibold rounded-2xl cursor-pointer hover:bg-teal-700 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export default TopProductsSection;
