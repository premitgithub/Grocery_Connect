import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedTagline = ({text, className}) => {
  const fullText =
    "Discover grocery stores near you and support local businesses.";
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
      }, 80);
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
      }, 50);
    };

    startTyping();

    // cleanup on unmount
    return () => {
      clearInterval(typingInterval);
      clearTimeout(eraseTimeout);
      clearTimeout(typingTimeout);
    };
  }, []);

  return (
    <motion.p
      className="text-gray-600 text-lg mt-5 max-w-2xl mx-auto font-medium tracking-wide text-center"
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

export default AnimatedTagline;

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// const AnimatedTagline = ({ text, className }) => {
//   const fullText =
//     text || "Discover grocery stores near you and support local businesses.";
//   const [displayedText, setDisplayedText] = useState("");
//   const [isTyping, setIsTyping] = useState(true);

//   useEffect(() => {
//     let i = 0;
//     let typingInterval;
//     let eraseTimeout;
//     let typingTimeout;

//     const startTyping = () => {
//       setIsTyping(true);
//       typingInterval = setInterval(() => {
//         setDisplayedText(fullText.slice(0, i + 1));
//         i++;
//         if (i === fullText.length) {
//           clearInterval(typingInterval);
//           eraseTimeout = setTimeout(startErasing, 2000); // pause before erasing
//         }
//       }, 80);
//     };

//     const startErasing = () => {
//       setIsTyping(false);
//       typingInterval = setInterval(() => {
//         setDisplayedText(fullText.slice(0, i - 1));
//         i--;
//         if (i === 0) {
//           clearInterval(typingInterval);
//           typingTimeout = setTimeout(startTyping, 1000); // pause before typing again
//         }
//       }, 50);
//     };

//     startTyping();

//     return () => {
//       clearInterval(typingInterval);
//       clearTimeout(eraseTimeout);
//       clearTimeout(typingTimeout);
//     };
//   }, [fullText]);

//   return (
//     <motion.p
//       className={`text-gray-600 text-lg mt-5 max-w-2xl mx-auto font-medium tracking-wide text-center ${
//         className || ""
//       }`}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       {displayedText}
//       <motion.span
//         animate={{ opacity: [0, 1, 0] }}
//         transition={{ repeat: Infinity, duration: 0.8 }}
//         className="text-teal-600"
//       >
//         |
//       </motion.span>
//     </motion.p>
//   );
// };

// export default AnimatedTagline;
