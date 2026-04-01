import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.button
      onClick={toggleTheme}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[9999] p-4 rounded-full shadow-2xl transition-colors duration-300
                 bg-white text-teal-700 dark:bg-slate-800 dark:text-yellow-400
                 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-teal-500/50 cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6" />
      ) : (
        <Moon className="w-6 h-6" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
