import React, { useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import ThemeToggle from "./components/ThemeToggle";
import ChatbotWidget from "./components/Chatbot/ChatbotWidget";

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
      <AppRoutes />
      <ThemeToggle />
      <Toaster position="top-center" reverseOrder={false} />
      <ChatbotWidget />
    </>
  );
};

export default App;

