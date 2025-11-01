import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OtpInput from "./OtpInput";
import { UserContext } from "../../context/UserContext";
import ShopOwnerPopup from "../ShopOwnerPopUp/ShopOwnerPopup";
import toast from "react-hot-toast";

const PhoneAuthModal = ({ onClose }) => {
  const { setUser } = useContext(UserContext);
  const [step, setStep] = useState("phone"); // "phone" | "otp"
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRolePopup, setShowRolePopup] = useState(false);

  // Step 1: Send OTP
  const handleSendOtp = () => {
    if (!phone.match(/^[6-9]\d{9}$/)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1200);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      alert("Please enter the 6-digit OTP.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // ✅ After verifying OTP, show role popup instead of inline buttons
      setShowRolePopup(true);
    }, 1200);
  };

  //   Step 3: Role selection (from separate ShopOwnerPopup)
  const handleRoleSelection = (isShopOwner) => {
    setUser({
      phone,
      isShopOwner,
      verified: true,
    });

    setShowRolePopup(false);
    setLoading(true);

    // ✅ Add loader and close everything
    setTimeout(() => {
      setLoading(false);
      toast.success("Logged in successfully 🎉");
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-gray-500 cursor-pointer hover:text-gray-800 duration-200 font-extrabold"
          >
            ✕
          </button>

          {loading ? (
            <div className="text-center py-10">⏳ Processing...</div>
          ) : (
            <>
              {step === "phone" && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold text-center text-teal-700">
                    Login / Signup
                  </h2>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 font-semibold rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                  <button
                    onClick={handleSendOtp}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg text-lg font-semibold duration-200 cursor-pointer"
                  >
                    Send OTP
                  </button>
                </div>
              )}

              {step === "otp" && (
                <div className="space-y-5 text-center">
                  <h2 className="text-2xl font-bold text-teal-700">
                    Enter OTP
                  </h2>
                  <p className="text-gray-500">Sent to +91 {phone}</p>
                  <OtpInput otp={otp} setOtp={setOtp} />
                  <button
                    onClick={handleVerifyOtp}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg text-lg font-semibold cursor-pointer duration-300"
                  >
                    Verify OTP
                  </button>
                  <p
                    onClick={() => setStep("phone")}
                    className="text-lg text-black cursor-pointer rounded-lg hover:bg-teal-200 bg-teal-100 py-4 px-7 duration-500"
                  >
                    Change number
                  </p>
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* ✅ Separate popup for role selection */}
        <AnimatePresence>
          {showRolePopup && <ShopOwnerPopup onSelect={handleRoleSelection} />}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhoneAuthModal;
