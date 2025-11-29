import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ShopHeader from "../../components/IndividualShops/ShopHeader";
import ShopImageSection from "../../components/IndividualShops/ShopImageSection";
import ShopInfoSection from "../../components/IndividualShops/ShopInfoSection";
import ShopProductsPreview from "../../components/IndividualShops/ShopProductsPreview";
import axios from "axios";

const ShopDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopAndProducts = async () => {
      try {
        const shopRes = await axios.get(`http://localhost:5000/api/shops/${id}`);
        setShop(shopRes.data);

        const productsRes = await axios.get(`http://localhost:5000/api/products?shopId=${id}`);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Error fetching shop details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchShopAndProducts();
    }
    window.scrollTo(0, 0);
  }, [id]);

  // Conditional render when shop is null (loading or not found)
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center text-gray-700">
          <p className="text-xl mb-4">Shop not found 😔</p>
          <button
            className="px-4 py-2 bg-teal-600 cursor-pointer text-white rounded-xl"
            onClick={() => navigate("/shops")}
          >
            Back to Shops
          </button>
        </div>
      </div>
    );
  }

  // Main UI render after shop is loaded
  return (
    <section className="px-6 sm:px-10 md:px-14 py-12 bg-gradient-to-b from-emerald-50 to-teal-50 min-h-screen">
      <ShopHeader shopName={shop.name} />

      {/* Wrapper container with padding and background */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-10 flex flex-col md:flex-row gap-6 md:gap-10 bg-white/90 rounded-3xl p-6 shadow-2xl max-w-6xl mx-auto"
        style={{ boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)" }}
      >
        {/* Just ShopImageSection directly */}
        <ShopImageSection shopImage={shop.image} shopName={shop.name} />

        {/* Info container remains as-is */}
        <div className="flex-grow rounded-3xl bg-white shadow-xl p-8 flex flex-col justify-center">
          <ShopInfoSection shop={shop} />
        </div>
      </motion.div>

      <ShopProductsPreview shop={shop} products={products} />
    </section>
  );
};

export default ShopDetailsPage;
