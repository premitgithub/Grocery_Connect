import React from "react";

const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-gradient-to-r from-teal-100 via-white to-emerald-100">
    <div className="w-16 h-16 border-4 border-teal-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

export default Loader;
