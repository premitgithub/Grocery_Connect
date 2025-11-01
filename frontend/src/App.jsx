import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Future routes can go here */}
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
