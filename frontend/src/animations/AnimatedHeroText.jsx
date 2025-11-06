import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedHeroText = () => {
  const fullHeading =
    "Supporting Local Grocery Stores in the Digital Era is what we AIM FOR.";
  const fullSubtext =
    "Grocera helps small grocery shops reach more customers — allowing users to find nearby stores that sell their favorite products.";

  const [displayedHeading, setDisplayedHeading] = useState("");
  const [displayedSubtext, setDisplayedSubtext] = useState("");
  const [isTypingSub, setIsTypingSub] = useState(true);

  useEffect(() => {
    // --- Type heading once ---
    let i = 0;
    const headingInterval = setInterval(() => {
      setDisplayedHeading(fullHeading.slice(0, i + 1));
      i++;
      if (i === fullHeading.length) clearInterval(headingInterval);
    }, 40);

    return () => clearInterval(headingInterval);
  }, []);

  useEffect(() => {
    // --- Looping typing & erasing for paragraph ---
    let j = 0;
    let typingInterval;
    let eraseTimeout;
    let typingTimeout;

    const startTyping = () => {
      setIsTypingSub(true);
      typingInterval = setInterval(() => {
        setDisplayedSubtext(fullSubtext.slice(0, j + 1));
        j++;
        if (j === fullSubtext.length) {
          clearInterval(typingInterval);
          eraseTimeout = setTimeout(startErasing, 2000); // pause before erasing
        }
      }, 50);
    };

    const startErasing = () => {
      setIsTypingSub(false);
      typingInterval = setInterval(() => {
        setDisplayedSubtext(fullSubtext.slice(0, j - 1));
        j--;
        if (j === 0) {
          clearInterval(typingInterval);
          typingTimeout = setTimeout(startTyping, 800); // pause before next loop
        }
      }, 30);
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(eraseTimeout);
      clearTimeout(typingTimeout);
    };
  }, []);

  return (
    <div className="text-center">
      {/* Heading — types once and stays */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-teal-900 leading-snug"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {displayedHeading.split("Local Grocery Stores").map((part, idx, arr) =>
          idx === arr.length - 1 ? (
            <span key={idx}>{part}</span>
          ) : (
            <span key={idx}>
              {part}
              <span className="text-teal-600">Local Grocery Stores</span>
            </span>
          )
        )}
      </motion.h1>

      {/* Subtext — loops infinitely */}
      <motion.p
        className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed mt-4 max-w-3xl mx-auto font-medium tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {displayedSubtext}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="text-teal-600"
        >
          |
        </motion.span>
      </motion.p>
    </div>
  );
};

export default AnimatedHeroText;
