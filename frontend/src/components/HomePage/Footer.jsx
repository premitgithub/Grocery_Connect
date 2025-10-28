import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-600">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="text-teal-700 font-semibold">Grocery Connect</span>.
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
