import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
