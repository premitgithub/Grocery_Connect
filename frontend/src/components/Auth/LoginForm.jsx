import React, { useState } from "react";
import axios from "axios";
import PasswordInput from "./../Shared/PasswordInput";

const LoginForm = ({ onLoginSuccess, onForgotPassword, switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ API call for login can go here
    
    try {
      const loginData = {email, password};

      const response = await axios.post("http://localhost:5000/api/login", loginData);
      console.log("✅ Login successful:", response.data);

      if (onLoginSuccess) onLoginSuccess(); // This will trigger popup/redirect logic
    }catch (error) {
      console.error("❌ Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email Address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 sm:p-4 border-b-2 border-gray-300 outline-none focus:border-emerald-500 placeholder-gray-400 text-sm sm:text-base"
      />

      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <div className="text-right">
        <p
          onClick={onForgotPassword}
          className="text-gray-700 hover:underline cursor-pointer text-sm sm:text-base"
        >
          Forgot password?
        </p>
      </div>

      <button
        type="submit"
        className="w-full p-3 sm:p-4 bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-3xl text-lg sm:text-xl font-medium hover:opacity-90 transition duration-300 cursor-pointer"
      >
        Login
      </button>

      <p className="text-center text-gray-600 text-sm sm:text-base mt-3">
        Don’t have an account?{" "}
        <span
          onClick={switchToSignup}
          className="text-emerald-600 font-medium hover:underline cursor-pointer"
        >
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default LoginForm;

