import React from "react";

const steps = [
  {
    title: "1. Discover Local Shops",
    desc: "Browse nearby grocery stores and explore what they offer.",
    img: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  },
  {
    title: "2. Place Your Order",
    desc: "Add items to your cart and order directly from the store.",
    img: "https://cdn-icons-png.flaticon.com/512/4290/4290854.png",
  },
  {
    title: "3. Fast Delivery or Pickup",
    desc: "Get your groceries delivered or pick them up at your convenience.",
    img: "https://cdn-icons-png.flaticon.com/512/2920/2920334.png",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 text-center transition-colors duration-300">
      <h2 className="text-3xl font-bold text-teal-900 dark:text-teal-100 mb-12 transition-colors duration-300">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-10 px-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 hover:shadow-gray-400 dark:hover:shadow-slate-700 hover:scale-[1.06] transition duration-300"
          >
            <img
              src={step.img}
              alt={step.title}
              className="w-20 mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold text-teal-800 dark:text-teal-300 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
