import React, { useState } from "react";
import axios from "axios";
import PasswordInput from "./../Shared/PasswordInput";

const SignupForm = ({ onSignupSuccess, switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");

    // ✅ API call for signup can go here
    
    try {
      const signupData = { name, email, password };
      const response = await axios.post("http://localhost:5000/api/signup", signupData);

      console.log("✅ Signup success:", response.data);
      // alert("Signup successful! You can now log in.");

      if (onSignupSuccess) onSignupSuccess();
      switchToLogin(); // ✅ Immediately go to login form
    }catch (error) {
      console.error("❌ Signup failed:", error.response?.data || error.message);
      // alert(error.response?.data?.message || "Signup failed");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(
      confirmPassword && e.target.value !== confirmPassword
        ? "Passwords do not match"
        : ""
    );
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError(
      password && e.target.value !== password ? "Passwords do not match" : ""
    );
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 sm:p-4 border-b-2 border-gray-300 outline-none focus:border-emerald-500 placeholder-gray-400 text-sm sm:text-base"
      />
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
        onChange={handlePasswordChange}
        placeholder="Password"
      />

      <PasswordInput
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        placeholder="Confirm Password"
        error={passwordError}
      />

      <button
        type="submit"
        disabled={!!passwordError}
        className={`w-full p-3 sm:p-4 rounded-3xl text-lg sm:text-xl font-medium transition duration-300 cursor-pointer ${
          passwordError
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-emerald-600 to-emerald-400 text-white hover:opacity-90"
        }`}
      >
        Sign Up
      </button>

      <p className="text-center text-gray-600 text-sm sm:text-base mt-3">
        Already have an account?{" "}
        <span
          onClick={switchToLogin}
          className="text-emerald-600 font-medium hover:underline cursor-pointer"
        >
          Login
        </span>
      </p>
    </form>
  );
};

export default SignupForm;

