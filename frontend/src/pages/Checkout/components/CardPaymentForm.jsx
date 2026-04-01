import React from "react";

const CardPaymentForm = ({ inputs, errors, handleChange, handleBlur }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Card Number
        </label>
        <input
          type="text"
          name="cardNumber"
          maxLength="16"
          placeholder="xxxx xxxx xxxx xxxx"
          value={inputs.cardNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full p-3 bg-gray-50 dark:bg-slate-900 border ${
            errors.cardNumber ? "border-red-500" : "border-gray-200 dark:border-gray-700"
          } rounded-xl focus:ring-2 focus:ring-teal-500 dark:text-gray-100`}
        />
        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Expiry Date
          </label>
          <input
            type="text"
            name="expiryDate"
            maxLength="5"
            placeholder="MM/YY"
            value={inputs.expiryDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-3 bg-gray-50 dark:bg-slate-900 border ${
              errors.expiryDate ? "border-red-500" : "border-gray-200 dark:border-gray-700"
            } rounded-xl focus:ring-2 focus:ring-teal-500 dark:text-gray-100 text-center`}
          />
          {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            CVV
          </label>
          <input
            type="password"
            name="cvv"
            maxLength="3"
            placeholder="***"
            value={inputs.cvv}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-3 bg-gray-50 dark:bg-slate-900 border ${
              errors.cvv ? "border-red-500" : "border-gray-200 dark:border-gray-700"
            } rounded-xl focus:ring-2 focus:ring-teal-500 dark:text-gray-100 text-center`}
          />
          {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          name="cardHolder"
          placeholder="Name on Card"
          value={inputs.cardHolder}
          onChange={handleChange}
          className="w-full p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 dark:text-gray-100"
        />
      </div>
    </div>
  );
};

export default CardPaymentForm;
