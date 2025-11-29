import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ProfileField from "../../components/account/ProfileField";
import AddressCard from "../../components/account/AddressCard";
import { defaultProfile } from "../../data/defaultData";
import toast from "react-hot-toast"; // ✅ import toast

const ProfilePage = () => {
  const { profile, setProfile, address, addresses, updateUserProfile } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateUserProfile(profile);
  };

  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-semibold text-gray-900 border-b pb-2">
        Profile Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProfileField
          label="Full Name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder={defaultProfile.name}
        />

        <ProfileField
          label="Phone Number (Verified)"
          name="phoneNumber"
          value={profile.phoneNumber}
          editable={false}
        />

        <ProfileField
          label="Email ID"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder={defaultProfile.email}
        />

        <ProfileField
          label="Alternate Phone Number"
          name="altPhone"
          value={profile.altPhone}
          onChange={handleChange}
          placeholder="Enter alternate phone number"
        />
      </div>

      {addresses.length > 0 ? (
        <AddressCard
          address={address || addresses[0]}
          onChangeClick={() => navigate("/account/address")}
        />
      ) : (
        <div className="border rounded-xl p-6 flex flex-col items-center justify-center space-y-4 bg-gray-50">
          <p className="text-gray-500 text-lg">No address found.</p>
          <button
            onClick={() => navigate("/account/address")}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition shadow-md"
          >
            + Add Address
          </button>
        </div>
      )}
      <div className="flex justify-center sm:justify-end">
        <button
          onClick={handleSave}
          className="
      mt-4
      px-8
      py-3
      bg-teal-600
      text-white
      font-semibold
      rounded-2xl
      cursor-pointer
      text-lg
      shadow-md
      hover:bg-teal-700
      hover:scale-105
      active:scale-95
      transition-all
      duration-300
    "
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
