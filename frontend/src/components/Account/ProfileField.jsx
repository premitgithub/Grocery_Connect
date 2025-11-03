const ProfileField = ({ label, value, name, onChange, editable = true, placeholder }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={!editable}
      placeholder={placeholder} 
      className={`w-full border rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-teal-500 focus:outline-none 
        ${!editable ? "bg-gray-100 cursor-not-allowed" : ""} 
        ${!value ? "placeholder-gray-400" : ""}`}
    />
  </div>
);

export default ProfileField;
