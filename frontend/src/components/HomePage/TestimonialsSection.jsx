import React from "react";

const testimonials = [
  {
    name: "Rohit Sharma",
    text: "Grocery Connect helped my family-run store get online orders easily. Love it!",
    img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  {
    name: "Priya Patel",
    text: "I found so many local shops nearby that I didn’t even know existed!",
    img: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  },
  {
    name: "Sandeep Verma",
    text: "As a shop owner, I now reach double the customers thanks to this platform.",
    img: "https://cdn-icons-png.flaticon.com/512/4128/4128176.png",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-teal-50 text-center">
      <h2 className="text-3xl font-bold text-teal-900 mb-10">
        What Our Users Say
      </h2>

      <div className="flex flex-col md:flex-row justify-center gap-8 px-10">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-8 max-w-sm mx-auto hover:shadow-lg transition"
          >
            <img
              src={t.img}
              alt={t.name}
              className="w-20 h-20 mx-auto rounded-full mb-4"
            />
            <p className="text-gray-700 italic mb-4">“{t.text}”</p>
            <h4 className="font-semibold text-teal-800">{t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
