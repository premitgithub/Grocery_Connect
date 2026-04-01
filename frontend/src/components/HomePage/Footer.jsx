import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-6 text-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="text-teal-700 dark:text-teal-300 font-semibold">Grocera</span>.
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
