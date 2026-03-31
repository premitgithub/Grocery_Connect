import React from "react";

const UpiPaymentForm = ({ inputs, errors, handleChange, handleBlur, amount }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Enter your UPI ID
        </label>
        <input
          type="text"
          name="upiId"
          placeholder="e.g. yourname@ybl"
          value={inputs.upiId}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full p-3 bg-gray-50 dark:bg-slate-900 border ${
            errors.upiId ? "border-red-500" : "border-gray-200 dark:border-gray-700"
          } rounded-xl focus:ring-2 focus:ring-teal-500 transition-shadow dark:text-gray-100`}
        />
        {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
      </div>

      <div className="flex flex-col items-center py-2">
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">OR SCAN QR ANYWHERE</p>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=upi://pay?pa=test@ybl&pn=GroceryConnect&am=${amount}`}
          alt="UPI QR"
          className="w-24 h-24 opacity-80 mix-blend-multiply border border-gray-100 p-1 rounded-lg"
        />
      </div>
    </div>
  );
};

export default UpiPaymentForm;
