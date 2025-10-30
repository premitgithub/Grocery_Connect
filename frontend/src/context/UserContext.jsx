import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores { name, email, isShopOwner }

  const loginUser = (userData) => {
    setUser(userData);
  };

  const updateShopOwnerStatus = (isOwner) => {
    setUser((prev) => ({ ...prev, isShopOwner: isOwner }));
  };

  return (
    <UserContext.Provider value={{ user, loginUser, updateShopOwnerStatus }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
