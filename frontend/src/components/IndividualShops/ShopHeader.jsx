import { motion } from "framer-motion";
import AnimatedTagline from "../../animations/AnimatedTagline";

const ShopHeader = ({ shopName }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <motion.h1
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-teal-800 tracking-tight"
      >
        {shopName}
      </motion.h1>

      {/* <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.8 }}
        className="mt-10 text-lg text-gray-700 max-w-xl mx-auto"
      >
        Fresh local groceries, delivered with care — shop and support your
        neighbourhood.
      </motion.p> */}
      <AnimatedTagline
        text="Fresh local groceries, delivered with care — shop and support your
        neighbourhood"
      />
    </motion.header>
  );
};

export default ShopHeader;
