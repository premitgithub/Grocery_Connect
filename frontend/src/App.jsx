import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import { UserContext } from "./context/UserContext"; // ✅ Import your UserContext

const App = () => {
  const { setUser } = useContext(UserContext);

  // ✅ Check for user session in localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setUser(JSON.parse(user)); // restore user to context
    }
  }, [setUser]);

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
