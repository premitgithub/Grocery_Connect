import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ShopHeader from "../../components/IndividualShops/ShopHeader";
import ShopImageSection from "../../components/IndividualShops/ShopImageSection";
import ShopInfoSection from "../../components/IndividualShops/ShopInfoSection";
import ShopProductsPreview from "../../components/IndividualShops/ShopProductsPreview";
import { shops as allShops } from "../../data/dummyShops"; // adjust path if needed

const ShopDetailsPage = () => {
  // const { id } = useParams();
  // const navigate = useNavigate();
  // const [shop, setShop] = useState(null);

  // useEffect(() => {
  //   // Find shop by id or decoded shopName
  //   const decoded = decodeURIComponent(id || "");
  //   const found = allShops.find(
  //     (s) => s._id === id || s.id === id || s.shopName === decoded
  //   );
  //   setShop(found || null);
  //   window.scrollTo(0, 0);
  // }, [id]);

  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    // Normalize and find by any possible match (id, name, slug)
    const decoded = decodeURIComponent(id || "").toLowerCase();

    const found = allShops.find((s) => {
      const normalizedName = s.shopName.toLowerCase().replace(/\s+/g, "-");
      return (
        s._id?.toString() === id ||
        s.id?.toString() === id ||
        normalizedName === decoded ||
        s.shopName.toLowerCase() === decoded
      );
    });

    setShop(found || null);
    window.scrollTo(0, 0);
  }, [id]);


  // Conditional render when shop is null (loading or not found)
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
      <ShopHeader shopName={shop.shopName} />

      {/* Wrapper container with padding and background */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-10 flex flex-col md:flex-row gap-6 md:gap-10 bg-white/90 rounded-3xl p-6 shadow-2xl max-w-6xl mx-auto"
        style={{ boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)" }}
      >
        {/* Just ShopImageSection directly */}
        <ShopImageSection shopImage={shop.shopImage} shopName={shop.shopName} />

        {/* Info container remains as-is */}
        <div className="flex-grow rounded-3xl bg-white shadow-xl p-8 flex flex-col justify-center">
          <ShopInfoSection shop={shop} />
        </div>
      </motion.div>

      <ShopProductsPreview shop={shop} />
    </section>
  );
};

export default ShopDetailsPage;
