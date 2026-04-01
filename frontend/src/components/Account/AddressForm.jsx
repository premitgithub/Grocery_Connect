import React, { useState } from "react";

const AddressForm = ({ initialData = {}, onSave, onCancel }) => {
  const [form, setForm] = useState({
    apartmentNo: "",
    floor: "",
    landmark: "",
    area: "",
    ...initialData,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 shadow-md space-y-4 border border-gray-200"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {initialData ? "Edit Address" : "Add New Address"}
      </h3>

      {["apartmentNo", "floor", "landmark", "area","pincode"].map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={`Enter ${field}`}
          className="w-full border text-lg border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
        />
      ))}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-teal-600 rounded-lg text-white hover:bg-teal-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
