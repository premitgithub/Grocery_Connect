import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";

const AddressSection = ({ addresses, selectedAddress, onSelectAddress, setAddresses, setGlobalAddress }) => {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    apartmentNo: "",
    floor: "",
    landmark: "",
    area: "",
    pincode: "",
  });

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!newAddress.area.trim() || !newAddress.pincode.trim() || !newAddress.apartmentNo.trim()) {
      toast.error("Apartment No, Area and Pincode are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/addresses", newAddress, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newAddr = res.data;
      setAddresses((prev) => [...prev, newAddr]);
      
      // Select it automatically
      onSelectAddress(newAddr);
      setGlobalAddress(newAddr);
      localStorage.setItem("address", JSON.stringify(newAddr));

      toast.success("Address added successfully!");
      setIsAddingAddress(false);
      setNewAddress({ apartmentNo: "", floor: "", landmark: "", area: "", pincode: "" });
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address");
    }
  };

  const isSelected = (addr) => {
    if (!selectedAddress) return false;
    // Check by _id first if available
    if (addr._id && selectedAddress._id) {
      return addr._id === selectedAddress._id;
    }
    // Fallback if no _id
    return addr.apartmentNo === selectedAddress.apartmentNo && addr.pincode === selectedAddress.pincode;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-gray-100">Delivery Address</h2>
        {!isAddingAddress && (
          <button
            onClick={() => setIsAddingAddress(true)}
            className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
          >
            + Add New Address
          </button>
        )}
      </div>

      {isAddingAddress && (
        <form onSubmit={handleAddAddress} className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Apartment No (Required)"
            value={newAddress.apartmentNo}
            onChange={(e) => setNewAddress({ ...newAddress, apartmentNo: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-teal-500 bg-transparent dark:text-gray-100"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Floor"
              value={newAddress.floor}
              onChange={(e) => setNewAddress({ ...newAddress, floor: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-teal-500 bg-transparent dark:text-gray-100"
            />
            <input
              type="text"
              placeholder="Landmark"
              value={newAddress.landmark}
              onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-teal-500 bg-transparent dark:text-gray-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Area (Required)"
              value={newAddress.area}
              onChange={(e) => setNewAddress({ ...newAddress, area: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-teal-500 bg-transparent dark:text-gray-100"
              required
            />
            <input
              type="text"
              placeholder="Pincode (Required)"
              value={newAddress.pincode}
              onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-teal-500 bg-transparent dark:text-gray-100"
              required
            />
          </div>
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Save Address
            </button>
            <button
              type="button"
              onClick={() => setIsAddingAddress(false)}
              className="bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {addresses && addresses.length > 0 ? (
        <div className="space-y-4">
          {addresses.map((addr, index) => {
            const selected = isSelected(addr);
            return (
              <div
                key={addr._id || index}
                onClick={() => onSelectAddress(addr)}
                className={`p-4 border rounded-xl cursor-pointer transition-colors ${
                  selected
                    ? "border-teal-600 bg-teal-50 dark:bg-teal-900/20 dark:border-teal-400"
                    : "border-gray-200 dark:border-slate-600 hover:border-teal-400 dark:hover:border-teal-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="dark:text-gray-300">
                    <p className="font-semibold text-lg">{addr.apartmentNo}</p>
                    <p className="text-sm">
                      {addr.floor && `${addr.floor}, `}{addr.area}
                    </p>
                    <p className="text-sm">
                      {addr.landmark && `${addr.landmark}, `}{addr.pincode}
                    </p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selected
                        ? "border-teal-600"
                        : "border-gray-300 dark:border-slate-500"
                    }`}
                  >
                    {selected && <div className="w-3 h-3 rounded-full bg-teal-600" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !isAddingAddress && (
          <p className="text-gray-500 dark:text-gray-400 italic">
            No addresses saved. Please add a new address.
          </p>
        )
      )}
    </motion.div>
  );
};

export default AddressSection;
