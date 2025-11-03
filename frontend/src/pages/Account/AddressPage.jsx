import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const AddressPage = () => {
  const { address, setAddress, addresses, setAddresses } =
    useContext(UserContext);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    apartmentNo: "",
    floor: "",
    landmark: "",
    area: "",
    pincode: "",
  });

  const navigate = useNavigate();

  const handleSelect = (addr) => {
    setAddress(addr);
    localStorage.setItem("address", JSON.stringify(addr));
    navigate("/account/profile");
  };

  const handleDelete = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newAddress.area.trim()) return;

    const updated = [...addresses, newAddress];
    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));

    setNewAddress({ apartmentNo: "", floor: "", landmark: "", area: "" , pincode: ""});
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header section with Add button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Addresses</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-teal-600 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            + Add Address
          </button>
        )}
      </div>

      {/* Smooth animated form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            key="addForm"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onSubmit={handleAdd}
            className="border p-4 rounded-xl space-y-3 bg-gray-50 shadow-sm mb-6"
          >
            <input
              type="text"
              placeholder="Apartment No"
              value={newAddress.apartmentNo}
              onChange={(e) =>
                setNewAddress({ ...newAddress, apartmentNo: e.target.value })
              }
              className="w-full border rounded-lg p-4 transition-shadow focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="text"
              placeholder="Floor"
              value={newAddress.floor}
              onChange={(e) =>
                setNewAddress({ ...newAddress, floor: e.target.value })
              }
              className="w-full border rounded-lg p-4 focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="text"
              placeholder="Landmark"
              value={newAddress.landmark}
              onChange={(e) =>
                setNewAddress({ ...newAddress, landmark: e.target.value })
              }
              className="w-full border rounded-lg p-4 focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="text"
              placeholder="Area"
              value={newAddress.area}
              onChange={(e) =>
                setNewAddress({ ...newAddress, area: e.target.value })
              }
              className="w-full border rounded-lg p-4 focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="text"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, pincode: e.target.value })
              }
              className="w-full border rounded-lg p-4 focus:ring-2 focus:ring-teal-400"
            />
            <div className="flex justify-end gap-8">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border cursor-pointer duration-300 border-gray-400 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-teal-600 cursor-pointer duration-300 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
              >
                Save
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Address list section */}
      {addresses.length === 0 ? (
        <p className="text-gray-500">No addresses saved yet.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map((addr, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`border rounded-xl p-6 text-lg flex justify-between items-start shadow-sm hover:shadow-md transition ${
                address.area === addr.area
                  ? "border-teal-500"
                  : "border-gray-300"
              }`}
            >
              <div>
                <p className="font-semibold">{addr.apartmentNo}</p>
                <p>{addr.floor}</p>
                <p>{addr.landmark}</p>
                <p>{addr.area}</p>
                <p>{addr.pincode}</p>
              </div>

              <div className="flex flex-col gap-5">
                <button
                  onClick={() => handleSelect(addr)}
                  className="bg-teal-600 text-white px-4 cursor-pointer duration-400 py-2 rounded-xl hover:bg-teal-700 transition"
                >
                  {address.area === addr.area ? "Selected" : "Select"}
                </button>

                <button
                  onClick={() => handleDelete(i)}
                  className="flex justify-center text-2xl text-red-500 cursor-pointer hover:text-red-800 transition"
                >
                  <FiTrash2 />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressPage;
