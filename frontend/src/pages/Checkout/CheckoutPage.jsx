import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import AddressSection from "./components/AddressSection";
import PaymentSection from "./components/PaymentSection";
import OrderSummarySection from "./components/OrderSummarySection";
import SimulatedPaymentModal from "./components/SimulatedPaymentModal";

const CheckoutPage = () => {
  const {
    user,
    cart,
    cartSubtotal,
    addresses,
    setAddresses,
    address: contextAddress,
    setAddress: setGlobalAddress,
    clearCartItems,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(contextAddress);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaymentValid, setIsPaymentValid] = useState(false);
  const [isProcessingCod, setIsProcessingCod] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deliveryFee = 50;
  const totalAmount = cartSubtotal > 0 ? cartSubtotal + deliveryFee : 0;

  useEffect(() => {
    if (cart.length === 0) {
      toast("Your cart is empty. Redirecting back to home.", { icon: "🛒" });
      navigate("/");
    }
  }, [cart.length, navigate]);

  useEffect(() => {
    if (contextAddress && !selectedAddress) {
      setSelectedAddress(contextAddress);
    }
  }, [contextAddress, selectedAddress]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/addresses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(res.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    if (user?.phoneNumber && addresses.length === 0) {
      fetchAddresses();
    }
  }, [user, addresses.length, setAddresses]);

  const placeOrdersInBackend = async (payloads) => {
    let successCount = 0;
    try {
      for (const payload of payloads) {
        await axios.post("http://localhost:5000/api/orders", payload);
        successCount++;
      }
      if (successCount > 0) {
        toast.success(`Order(s) placed successfully via ${paymentMethod}!`);
        clearCartItems();
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to post orders:", error);
      const errorMessage = error.response?.data?.message || "Failed to sync order internally. Please contact support.";
      toast.error(errorMessage);
    } finally {
      setIsProcessingCod(false);
      setIsModalOpen(false); // Make sure modal closes safely eventually
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address.");
      return;
    }
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    if (paymentMethod === "COD") {
      setIsProcessingCod(true);
      const addressStr = selectedAddress.apartmentNo
        ? `${selectedAddress.apartmentNo}, ${selectedAddress.area}, ${selectedAddress.pincode}`
        : `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.zipCode}`;

      const shopGroups = {};
      cart.forEach((item) => {
        const shopId = item.product?.shop?._id || item.product?.shop;
        if (!shopId) return; // Ignore legacy products without shop mapping
        if (!shopGroups[shopId]) shopGroups[shopId] = [];
        shopGroups[shopId].push(item);
      });

      const payloads = Object.keys(shopGroups).map((shopId) => {
        const items = shopGroups[shopId];
        const shopSubtotal = items.reduce((sum, item) => sum + Number(item.product?.price || 0) * item.qty, 0);
        return {
          shop: shopId,
          customer: user?._id || "CUSTOMER_ID",
          items: items.map((item) => ({ product: item.product._id, quantity: item.qty })),
          totalAmount: shopSubtotal + deliveryFee,
          deliveryAddress: addressStr,
          paymentMode: "COD",
          paymentStatus: "Pending",
        };
      });

      if (payloads.length === 0) {
        toast.error("Products missing shop assignments. Contact support.");
        setIsProcessingCod(false);
        return;
      }
      
      await placeOrdersInBackend(payloads);
    } else {
      // Unfurl Modal instead of inline
      setIsModalOpen(true);
    }
  };

  const handleModalSuccess = () => {
    const addressStr = selectedAddress.apartmentNo
      ? `${selectedAddress.apartmentNo}, ${selectedAddress.area}, ${selectedAddress.pincode}`
      : `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.zipCode}`;

    const shopGroups = {};
    cart.forEach((item) => {
      const shopId = item.product?.shop?._id || item.product?.shop;
      if (!shopId) return;
      if (!shopGroups[shopId]) shopGroups[shopId] = [];
      shopGroups[shopId].push(item);
    });

    const payloads = Object.keys(shopGroups).map((shopId) => {
      const items = shopGroups[shopId];
      const shopSubtotal = items.reduce((sum, item) => sum + Number(item.product?.price || 0) * item.qty, 0);
      return {
        shop: shopId,
        customer: user?._id || "CUSTOMER_ID",
        items: items.map((item) => ({ product: item.product._id, quantity: item.qty })),
        totalAmount: shopSubtotal + deliveryFee,
        deliveryAddress: addressStr,
        paymentMode: paymentMethod,
        paymentStatus: "Paid",
      };
    });

    if (payloads.length > 0) {
      placeOrdersInBackend(payloads);
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 dark:bg-slate-900 transition-colors duration-300 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold dark:text-gray-100">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <AddressSection
              addresses={addresses}
              selectedAddress={selectedAddress}
              onSelectAddress={setSelectedAddress}
              setAddresses={setAddresses}
              setGlobalAddress={setGlobalAddress}
            />
            <PaymentSection
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              onValidityChange={setIsPaymentValid}
            />
          </div>

          <div className="lg:col-span-1">
            <OrderSummarySection
              cart={cart}
              cartSubtotal={cartSubtotal}
              deliveryFee={deliveryFee}
              totalAmount={totalAmount}
              onPlaceOrder={handlePlaceOrder}
              isPaymentValid={isPaymentValid && !isProcessingCod && !isModalOpen}
            />
            {isProcessingCod && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 p-4 bg-teal-50 dark:bg-teal-900 border border-teal-200 dark:border-teal-700 rounded-xl text-center"
              >
                <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-teal-800 dark:text-teal-200 font-bold">Processing Order...</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Simulated Payment Gateway Popup */}
      <SimulatedPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={totalAmount}
        paymentMethod={paymentMethod}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default CheckoutPage;
