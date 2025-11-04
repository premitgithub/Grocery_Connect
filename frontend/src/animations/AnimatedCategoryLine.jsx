import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedCategoryLine = ({ categoryName }) => {
  const text = `Explore and enjoy the freshest, hand-picked ${decodeURIComponent(
    categoryName
  ).toLowerCase()} from trusted local shops — delivered to your doorstep in minutes!`;

  const words = text.split(" ");
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Stay visible longer (5s), disappear+reappear cycle faster
    const interval = setInterval(() => setShow((prev) => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }, // faster reappear
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.12, staggerDirection: -1 }, // slower smooth fade
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <div
      className="text-gray-600 mt-6 text-xl flex flex-wrap justify-center items-center relative"
      style={{ minHeight: "2.5rem" }} // prevents movement
    >
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            key="text"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-wrap justify-center absolute top-0 left-0 w-full"
          >
            {words.map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="mr-1">
                {word}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedCategoryLine;
