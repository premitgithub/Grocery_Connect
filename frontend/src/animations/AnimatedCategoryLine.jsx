import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedCategoryLine = ({ categoryName }) => {
  const fullText = `Explore and enjoy the freshest, hand-picked ${decodeURIComponent(
    categoryName
  ).toLowerCase()} from trusted local shops — delivered to your doorstep in minutes!`;

  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    let typingInterval;
    let eraseTimeout;
    let typingTimeout;

    const startTyping = () => {
      setIsTyping(true);
      typingInterval = setInterval(() => {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
        if (i === fullText.length) {
          clearInterval(typingInterval);
          eraseTimeout = setTimeout(startErasing, 2000); // pause before erasing
        }
      }, 60); // typing speed
    };

    const startErasing = () => {
      setIsTyping(false);
      typingInterval = setInterval(() => {
        setDisplayedText(fullText.slice(0, i - 1));
        i--;
        if (i === 0) {
          clearInterval(typingInterval);
          typingTimeout = setTimeout(startTyping, 1000); // pause before typing again
        }
      }, 40); // erasing speed
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(eraseTimeout);
      clearTimeout(typingTimeout);
    };
  }, [categoryName]); // re-run if category changes

  return (
    <motion.p
      className="text-gray-600 text-lg sm:text-xl mt-6 max-w-3xl mx-auto font-medium tracking-wide text-center leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="text-teal-600"
      >
        |
      </motion.span>
    </motion.p>
  );
};

export default AnimatedCategoryLine;
