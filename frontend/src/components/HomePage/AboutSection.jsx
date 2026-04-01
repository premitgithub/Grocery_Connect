import React from "react";

const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-teal-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-center transition-colors duration-300">
      <h2 className="text-3xl font-bold text-teal-900 dark:text-teal-100 mb-6 transition-colors duration-300">
        Why Grocera?
      </h2>
      <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-300">
        With ultra-fast delivery apps taking over, local grocery stores often
        struggle to keep up. Grocery Connect empowers them by giving a digital
        platform to reach their nearby customers, while helping people shop
        locally — supporting both convenience and community.
      </p>
    </section>
  );
};

export default AboutSection;
