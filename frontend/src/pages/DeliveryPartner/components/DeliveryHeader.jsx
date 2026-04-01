import React from "react";

const DeliveryHeader = ({ isOnline, toggleOnlineStatus, handleLogout }) => {
  return (
    <header className="bg-teal-700 dark:bg-slate-800 text-white shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold tracking-tight">Delivery Partner</h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{isOnline ? "Online" : "Offline"}</span>
            <button
              onClick={toggleOnlineStatus}
              className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 p-1 cursor-pointer ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isOnline ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold hover:text-teal-200 transition bg-teal-800/50 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DeliveryHeader;
