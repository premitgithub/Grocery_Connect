import React from "react";

const stats = [
  { label: "Active Shops", value: "1,200+" },
  { label: "Happy Customers", value: "25,000+" },
  { label: "Orders Delivered", value: "80,000+" },
  { label: "Cities Covered", value: "15+" },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-white text-center">
      <div className="grid md:grid-cols-4 gap-8 px-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-teal-50 rounded-2xl p-8 shadow-md hover:shadow-gray-300 transition"
          >
            <h3 className="text-3xl font-bold text-teal-800">{stat.value}</h3>
            <p className="text-gray-700 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
