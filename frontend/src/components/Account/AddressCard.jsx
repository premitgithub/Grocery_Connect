import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const AddressCard = ({ address, onChangeClick }) => {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h4 className="flex items-center text-lg font-semibold text-teal-700 mb-2">
        <FaMapMarkerAlt className="mr-2" /> Default Address
      </h4>
      <p className="text-gray-700 text-lg leading-relaxed">
        {address.apartmentNo}, {address.floor && `${address.floor}, `}
        {address.area}
        {address.landmark && <>, {address.landmark}</>} {<>, {address.pincode}</>}
      </p>
      <button
        onClick={onChangeClick}
        className="mt-5 mb-8 py-3 px-7 bg-teal-600 text-white right-5 font-semibold duration-200 cursor-pointer rounded-2xl text-lg hover:bg-teal-700 transition"
      >
        Change Address
      </button>
    </div>
  );
};

export default AddressCard;
