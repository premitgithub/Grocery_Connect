import React from "react";

const AuthTabs = ({ isLoginMode, setIsLoginMode }) => (
  <div className="relative flex h-12 sm:h-14 mb-8 border border-gray-400 rounded-3xl overflow-hidden">
    <button
      onClick={() => setIsLoginMode(true)}
      className={`w-1/2 text-base sm:text-lg font-medium cursor-pointer transition-all z-10 ${
        isLoginMode ? "text-white" : "text-black"
      }`}
    >
      Login
    </button>
    <button
      onClick={() => setIsLoginMode(false)}
      className={`w-1/2 text-base sm:text-lg font-medium cursor-pointer transition-all z-10 ${
        !isLoginMode ? "text-white" : "text-black"
      }`}
    >
      Sign Up
    </button>
    <div
      className={`rounded-3xl absolute top-0 h-full w-1/2 bg-gradient-to-r from-emerald-700 to-emerald-500 ${
        isLoginMode ? "left-0" : "left-1/2"
      }`}
      style={{ transition: "left 0.5s ease-in-out" }}
    ></div>
  </div>
);

export default AuthTabs;
