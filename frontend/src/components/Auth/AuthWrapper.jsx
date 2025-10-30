import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AuthTabs from "./AuthTabs";
import ForgotPasswordModal from "../ForgotPasswordModal/ForgotPasswordModal";

const AuthWrapper = ({ onLoginSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Called when signup completes successfully
  const handleSignupSuccess = () => {
    setIsLoginMode(true); // ✅ Move to login form
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg w-[90%] sm:w-[450px] md:w-[600px] max-w-full">
        <div className="w-full bg-white p-6 sm:p-8 md:p-12 rounded-3xl">
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-gray-800">
              {isLoginMode ? "Login" : "Sign Up"}
            </h2>
          </div>

          <AuthTabs isLoginMode={isLoginMode} setIsLoginMode={setIsLoginMode} />

          {isLoginMode ? (
            <LoginForm
              onLoginSuccess={onLoginSuccess}
              onForgotPassword={() => setShowForgotModal(true)}
              switchToSignup={() => setIsLoginMode(false)}
            />
          ) : (
            <SignupForm
              onSignupSuccess={handleSignupSuccess} // ✅ switch to login after signup
              switchToLogin={() => setIsLoginMode(true)}
            />
          )}
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      />
    </>
  );
};

export default AuthWrapper;
