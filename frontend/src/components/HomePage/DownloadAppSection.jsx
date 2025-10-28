import React from "react";

const DownloadAppSection = () => {
  return (
    <section className="py-20 bg-teal-600 text-white text-center">
      <h2 className="text-4xl font-bold mb-4">Get the App</h2>
      <p className="text-lg mb-8">
        Order groceries anytime, anywhere with the Grocery Connect App.
      </p>
      <div className="flex justify-center space-x-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          alt="Google Play"
          className="h-12"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/96/Apple_App_Store_badge.svg"
          alt="App Store"
          className="h-12"
        />
      </div>
    </section>
  );
};

export default DownloadAppSection;
