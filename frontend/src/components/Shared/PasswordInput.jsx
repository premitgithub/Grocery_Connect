import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  value,
  onChange,
  placeholder = "Password",
  required = true,
  error = "",
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full p-3 sm:p-4 border-b-2 outline-none placeholder-gray-400 text-sm sm:text-base 
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-emerald-500"
          }
          ${className}`}
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-3.5 sm:top-4 text-gray-500 cursor-pointer hover:text-emerald-500 transition"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
      {error && <p className="text-red-500 text-sm mt-2 text-right">{error}</p>}
    </div>
  );
};

export default PasswordInput;
