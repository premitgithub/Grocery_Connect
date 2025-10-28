import "../../styles/homepage.css";

const shops = [
  {
    name: "Fresh Mart",
    location: "Downtown",
    img: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
  },
  {
    name: "Daily Needs",
    location: "Green Street",
    img: "https://cdn-icons-png.flaticon.com/512/2972/2972188.png",
  },
  {
    name: "Family Grocery",
    location: "Lake View",
    img: "https://cdn-icons-png.flaticon.com/512/2972/2972217.png",
  },
  {
    name: "Super Grocers",
    location: "East End",
    img: "https://cdn-icons-png.flaticon.com/512/2972/2972183.png",
  },
  {
    name: "Green Basket",
    location: "Market Street",
    img: "https://cdn-icons-png.flaticon.com/512/2972/2972187.png",
  },
  {
    name: "Daily Fresh",
    location: "West Town",
    img: "https://cdn-icons-png.flaticon.com/512/2972/2972189.png",
  },
];

const ShopHighlights = () => {
  return (
    <section className="py-16 bg-white overflow-hidden relative">
      <h2 className="text-3xl font-bold text-center text-teal-900 mb-10">
        Featured Local Shops
      </h2>

      {/* Scrolling container */}
      <div className="relative w-full py-6 overflow-hidden">
        <div className="flex animate-scroll gap-6">
          {/* Duplicate shop list twice for seamless looping */}
          {[...shops, ...shops].map((shop, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 bg-teal-50 rounded-2xl shadow-gray-400 p-6 hover:shadow-lg hover:scale-[1.04] transition duration-300"
            >
              <img
                src={shop.img}
                alt={shop.name}
                className="w-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-teal-800 text-center">
                {shop.name}
              </h3>
              <p className="text-gray-600 font-medium text-center">{shop.location}</p>
              <button className="mt-4 px-4 py-3 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition duration-500 mx-auto block font-semibold cursor-pointer">
                View Products
              </button>
            </div>
          ))}
        </div>

        {/* Optional fade edges for nice visual */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export default ShopHighlights;
