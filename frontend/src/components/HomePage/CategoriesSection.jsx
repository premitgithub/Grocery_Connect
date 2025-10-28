import React from "react";

const categories = [
  {
    name: "Vegetables",
    img: "/groceries/vegetable.png",
  },
  {
    name: "Fruits",
    img: "/groceries/basket.png",
  },
  {
    name: "Dairy & Eggs",
    img: "/groceries/dairy-products.png",
  },
  {
    name: "Snacks",
    img: "/groceries/snack.png",
  },
  {
    name: "Beverages",
    img: "/groceries/soft-drink.png",
  },
  {
    name: "Bakery",
    img: "/groceries/bakery.png",
  },
  {
    name: "Chocolates",
    img: "/groceries/chocolate.png",
  },
  {
    name: "Pantry Samples",
    img: "/groceries/pantry.png",
  },
  {
    name: "Oil and Masala",
    img: "/groceries/cooking-oil.png",
  },
  {
    name: "Others",
    img: "/groceries/shelves.png",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-white via-teal-50 to-emerald-50">
      <h2 className="text-3xl font-bold text-center text-teal-900 mb-10">
        Shop by Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 px-10">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 hover:shadow-gray-300 hover:scale-[1.08] transition cursor-pointer duration-300"
          >
            <img src={category.img} alt={category.name} className="w-16 mb-4" />
            <h3 className="text-lg font-semibold text-teal-800 text-center">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
