import "../../styles/homepage.css";

const products = [
  {
    name: "Organic Apples",
    price: "₹120/kg",
    img: "/groceries/apple.png",
  },
  {
    name: "Fresh Milk",
    price: "₹60/L",
    img: "/groceries/milk.png",
  },
  {
    name: "Brown Bread",
    price: "₹40",
    img: "/groceries/bread.png",
  },
  {
    name: "Tomatoes",
    price: "₹30/kg",
    img: "/groceries/tomato.png",
  },
  {
    name: "Biscuits Pack",
    price: "₹25",
    img: "/groceries/cookie.png",
  },
  {
    name: "Instant Noodles",
    price: "₹30",
    img: "/groceries/noodles.png",
  },
  {
    name: "Banana",
    price: "₹20/kg",
    img: "/groceries/banana.png",
  },
  {
    name: "Chips",
    price: "₹20",
    img: "/groceries/chips.png",
  },
  {
    name: "Coldrinks",
    price: "₹15",
    img: "/groceries/soft-drink.png",
  },
  {
    name: "Wheat Flour",
    price: "₹50",
    img: "/groceries/wheat.png",
  },
  {
    name: "Pasta",
    price: "₹40",
    img: "/groceries/pasta.png",
  },
  {
    name: "MatchBox",
    price: "₹10",
    img: "/groceries/matches.png",
  },
  {
    name: "Eggs",
    price: "₹80",
    img: "/groceries/egg.png",
  },
];

const TopProductsSection = () => {
  return (
    <section className="py-16 bg-white overflow-hidden relative">
      <h2 className="text-3xl font-bold text-center text-teal-900 mb-10">
        Trending Products
      </h2>

      <div className="relative w-full overflow-hidden py-10">
        <div className="flex animate-scroll-reverse gap-6">
          {/* Duplicate products list for seamless infinite scroll */}
          {[...products, ...products].map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-56 bg-teal-50 rounded-2xl shadow-lg p-6 text-center hover:shadow-gray-400 hover:scale-[1.05] transition duration-300 "
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-20 mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-teal-800">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-3 font-semibold">{product.price}</p>
              <button className="px-4 py-3 bg-teal-600 text-white font-semibold rounded-2xl cursor-pointer hover:bg-teal-700 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Fade edges for visual depth */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export default TopProductsSection;
