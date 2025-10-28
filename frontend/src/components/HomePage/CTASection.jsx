import React from "react";

const CTASection = () => {
  return (
    <section className="py-30 bg-gradient-to-r from-teal-600 to-emerald-600 text-center text-white">
      <h2 className="text-4xl font-bold mb-4">Own a Grocery Store?</h2>
      <p className="text-2xl mb-8">
        Join Grocery Connect and grow your business with us!
      </p>
      <button className="bg-white text-teal-700 text-2xl font-semibold px-8 py-4 rounded-2xl transition cursor-pointer">
        List Your Shop
      </button>
    </section>
  );
};

export default CTASection;
