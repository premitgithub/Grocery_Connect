import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UpiPaymentForm from "./UpiPaymentForm";
import CardPaymentForm from "./CardPaymentForm";
import PaymentStatusStates from "./PaymentStatusStates";

const SimulatedPaymentModal = ({ isOpen, onClose, amount, paymentMethod, onSuccess }) => {
  const [inputs, setInputs] = useState({
    upiId: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
  });
  
  const [touched, setTouched] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);

  // Validation Maps
  const errors = {};
  if (paymentMethod === "UPI") {
    if (touched.upiId && !/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(inputs.upiId)) {
      errors.upiId = "Please enter a valid UPI ID (e.g., yourname@bank)";
    }
  } else if (paymentMethod === "Card (Credit/Debit)") {
    if (touched.cardNumber && inputs.cardNumber.length !== 16) errors.cardNumber = "16-digit Card Number required.";
    if (touched.expiryDate && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(inputs.expiryDate)) errors.expiryDate = "Invalid Format (MM/YY).";
    if (touched.cvv && inputs.cvv.length !== 3) errors.cvv = "3-digit CVV required.";
  }

  const isValid = 
    paymentMethod === "UPI" ? (inputs.upiId && !errors.upiId) : 
    paymentMethod === "Card (Credit/Debit)" ? (inputs.cardNumber && inputs.expiryDate && inputs.cvv && inputs.cardHolder && Object.keys(errors).length === 0) : false;

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "cardNumber" || name === "cvv") value = value.replace(/\D/g, "");
    if (name === "expiryDate") {
      value = value.replace(/\D/g, "");
      if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2, 4);
      else if (value.length > 4) value = value.slice(0, 5); // strict length trap
    }
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const simulatePayment = () => {
    if (!isValid) return; // Prevent raw submission
    setPaymentFailed(false);
    setIsProcessing(true);

    setTimeout(() => {
      // 95% Chance of generic success, small chance of random failure for realism
      if (Math.random() > 0.05) {
        setPaymentSuccess(true);
        setIsProcessing(false);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500); // Wait 1.5s reading success before auto closing triggers backend callback
      } else {
        setPaymentFailed(true);
        setIsProcessing(false);
      }
    }, 2500);
  };

  // Prevent background interactions naturally by capturing events inside overlay
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="bg-teal-600 dark:bg-teal-700 p-5 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔒</span>
              <h2 className="text-lg font-bold">Secure Payment</h2>
            </div>
            {!isProcessing && !paymentSuccess && (
              <button onClick={onClose} className="text-teal-200 hover:text-white transition-colors text-2xl leading-none">&times;</button>
            )}
          </div>

          {/* Body Content */}
          <div className="p-6">
            {!isProcessing && !paymentSuccess && !paymentFailed && (
              <div className="space-y-6">
                
                {/* Visual Amount Overview */}
                <div className="flex justify-between items-end border-b border-gray-100 dark:border-slate-700 pb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Payment Method</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{paymentMethod}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">To Pay</p>
                    <p className="text-2xl font-bold text-teal-600">₹{amount}</p>
                  </div>
                </div>

                {/* Specific Form Rendering modularized */}
                {paymentMethod === "UPI" && (
                  <UpiPaymentForm 
                    inputs={inputs} 
                    errors={errors} 
                    handleChange={handleChange} 
                    handleBlur={handleBlur} 
                    amount={amount} 
                  />
                )}

                {paymentMethod === "Card (Credit/Debit)" && (
                  <CardPaymentForm 
                    inputs={inputs} 
                    errors={errors} 
                    handleChange={handleChange} 
                    handleBlur={handleBlur} 
                  />
                )}

                {/* Submit Action */}
                <button
                  onClick={simulatePayment}
                  disabled={!isValid}
                  className={`w-full py-4 text-lg font-bold rounded-xl text-white transition-all shadow-md mt-4 ${isValid ? "bg-teal-600 hover:bg-teal-700 hover:shadow-lg active:scale-[0.98]" : "bg-gray-400 cursor-not-allowed"}`}
                >
                  Pay ₹{amount}
                </button>
              </div>
            )}

            {/* De-coupled Progress Trackers */}
            <PaymentStatusStates 
              isProcessing={isProcessing} 
              paymentSuccess={paymentSuccess} 
              paymentFailed={paymentFailed} 
              setPaymentFailed={setPaymentFailed} 
            />

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SimulatedPaymentModal;
