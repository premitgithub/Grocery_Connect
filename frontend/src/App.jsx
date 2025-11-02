import React, { useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes"; // ✅ use central route manager

const App = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setUser(JSON.parse(user));
    }
  }, [setUser]);

  return (
    <>
      <AppRoutes /> {/* ✅ All routing handled here */}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;

