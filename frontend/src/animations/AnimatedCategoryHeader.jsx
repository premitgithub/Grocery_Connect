import { motion } from "framer-motion";

const AnimatedCategoryHeader = ({ categoryName }) => {
  const words = decodeURIComponent(categoryName).split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.h2
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-3xl md:text-6xl font-extrabold text-teal-800 drop-shadow-lg tracking-wide text-center"
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={child} className="mr-2 inline-block">
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default AnimatedCategoryHeader;
