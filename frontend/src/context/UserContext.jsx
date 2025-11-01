// import React, { createContext, useContext, useState } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // stores { name, email, isShopOwner }

//   const loginUser = (userData) => {
//     setUser(userData);
//   };

//   const updateShopOwnerStatus = (isOwner) => {
//     setUser((prev) => ({ ...prev, isShopOwner: isOwner }));
//   };

//   return (
//     <UserContext.Provider value={{ user, loginUser, updateShopOwnerStatus }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);

// src/context/UserContext.jsx
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    phone: null,
    isShopOwner: false,
    verified: false,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
