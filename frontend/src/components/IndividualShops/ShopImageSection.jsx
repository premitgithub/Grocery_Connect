import { motion } from "framer-motion";

const ShopImageSection = ({ shopImage, shopName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl overflow-hidden max-w-lg w-full md:w-auto"
      style={{ backgroundColor: "transparent" }} // make sure no bg color here
    >
      <img
        src={shopImage}
        alt={shopName}
        className="w-full h-72 md:h-96 object-contain block shadow-2xl"
        style={{ display: "block" }} // removes any inline gaps under img
      />
    </motion.div>
  );
};

export default ShopImageSection;
