// src/components/Auth/OtpInput.jsx
import React, { useRef } from "react";

const OtpInput = ({ otp, setOtp }) => {
  const inputs = useRef([]);

  const handleChange = (e, i) => {
    const val = e.target.value.replace(/\D/g, ""); // accept only digits
    const otpArray = otp.split("");

    if (val) {
      otpArray[i] = val[val.length - 1]; // take last entered digit
      setOtp(otpArray.join(""));

      if (i < 5) inputs.current[i + 1].focus(); // move forward
    } else {
      otpArray[i] = "";
      setOtp(otpArray.join(""));
    }
  };

  const handleKeyDown = (e, i) => {
    // Handle Backspace correctly
    if (e.key === "Backspace") {
      e.preventDefault(); // prevent default delete behavior
      const otpArray = otp.split("");

      if (otpArray[i]) {
        // if current box has a value, clear it
        otpArray[i] = "";
        setOtp(otpArray.join(""));
      } else if (i > 0) {
        // if current is empty, move to previous box and clear it
        inputs.current[i - 1].focus();
        const prevArray = otp.split("");
        prevArray[i - 1] = "";
        setOtp(prevArray.join(""));
      }
    }
  };

  return (
    <div className="flex justify-center gap-3 my-4">
      {[...Array(6)].map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          value={otp[i] || ""}
          ref={(el) => (inputs.current[i] = el)}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-10 h-12 border border-gray-300 rounded-lg text-center text-lg focus:ring-2 focus:ring-teal-500 outline-none"
        />
      ))}
    </div>
  );
};

export default OtpInput;
