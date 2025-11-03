import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../../context/UserContext";
import CartItem from "../../components/Cart/CartItem";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cart,
    setCartQty,
    removeFromCart,
    clearCart,
    cartSubtotal,
    totalItems,
  } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-teal-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold">My Cart</h1>
          <div className="text-gray-600">
            Items: <span className="font-semibold">{totalItems}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <AnimatePresence>
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-20 bg-white hover:shadow-2xl duration-400 rounded-2xl mt-50 shadow-sm text-center"
                >
                  <p className="text-2xl text-gray-600 mb-4">
                    Oops !! Your cart is empty.
                  </p>
                  <button
                    onClick={() => navigate("/products")}
                    className="bg-teal-600 text-xl mt-8 hover:bg-teal-800 cursor-pointer duration-400 text-white px-6 py-5 rounded-lg"
                  >
                    Browse Products
                  </button>
                </motion.div>
              ) : (
                cart.map((it) => (
                  <motion.div
                    key={it.productId}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="mb-4"
                  >
                    <CartItem
                      item={it}
                      onQtyChange={(qty) => setCartQty(it.productId, qty)}
                      onRemove={() => removeFromCart(it.productId)}
                    />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Right column: summary */}
          <aside className="bg-white p-10 rounded-2xl mt-50 hover:shadow-2xl duration-400 h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between my-2">
              <span>Subtotal</span>
              <span className="font-semibold">₹{cartSubtotal}</span>
            </div>
            <div className="border-t mt-4 pt-4 space-y-3">
              <button className="w-full bg-teal-600 cursor-pointer text-xl hover:bg-teal-800 duration-400 py-5 rounded-lg text-white font-semibold">
                Proceed to Checkout
              </button>
              <button
                onClick={() => clearCart()}
                className="w-full border text-xl border-gray-300 py-5 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-200 duration-400"
              >
                Clear Cart
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
