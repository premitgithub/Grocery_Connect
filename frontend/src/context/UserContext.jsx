// import { createContext, useState, useEffect } from "react";
// import { defaultProfile, defaultAddress } from "../data/defaultData";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   // --- USER AUTH STATE ---
//   const [user, setUser] = useState(() => {
//     const stored = localStorage.getItem("user");
//     return stored
//       ? JSON.parse(stored)
//       : { phone: null, isShopOwner: false, verified: false };
//   });

//   // --- PROFILE ---
//   const [profile, setProfile] = useState(() => {
//     const stored = localStorage.getItem("profile");
//     const userStored = JSON.parse(localStorage.getItem("user") || "{}");

//     return stored
//       ? JSON.parse(stored)
//       : {

//           ...defaultProfile,
//           phone: userStored.phone || "",
//         };
//   });

//   // --- ADDRESS ---
//   const [address, setAddress] = useState(() => {
//     const stored = localStorage.getItem("address");
//     return stored ? JSON.parse(stored) : defaultAddress;
//   });

//   // --- Keep profile phone synced with user phone ---
//   useEffect(() => {
//     if (user?.phone && profile?.phone !== user.phone) {
//       setProfile((prev) => ({ ...prev, phone: user.phone }));
//     }
//   }, [user.phone]);

//   // --- Persist everything ---
//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(user));
//   }, [user]);

//   useEffect(() => {
//     localStorage.setItem("profile", JSON.stringify(profile));
//   }, [profile]);

//   useEffect(() => {
//     localStorage.setItem("address", JSON.stringify(address));
//   }, [address]);

//   // --- Helper (optional, to manually update and persist)
//   const updateUserData = (data) => {
//     setUser(data);
//     localStorage.setItem("user", JSON.stringify(data));
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         setUser, // ✅ keep original React setter
//         updateUserData, // ✅ helper, if you want to persist manually
//         profile,
//         setProfile,
//         address,
//         setAddress,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// import { createContext, useState, useEffect } from "react";
// import { defaultProfile, defaultAddress } from "../data/defaultData";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   // --- USER AUTH STATE ---
//   const [user, setUser] = useState(() => {
//     const stored = localStorage.getItem("user");
//     return stored
//       ? JSON.parse(stored)
//       : { phone: null, isShopOwner: false, verified: false };
//   });

//   // --- PROFILE ---
//   const [profile, setProfile] = useState(() => {
//     const stored = localStorage.getItem("profile");
//     const userStored = JSON.parse(localStorage.getItem("user") || "{}");

//     return stored
//       ? JSON.parse(stored)
//       : {
//           ...defaultProfile,
//           phone: userStored.phone || "",
//         };
//   });

//   // --- SINGLE DEFAULT ADDRESS (for backward compatibility) ---
//   const [address, setAddress] = useState(() => {
//     const stored = localStorage.getItem("address");
//     return stored ? JSON.parse(stored) : defaultAddress;
//   });

//   // --- MULTIPLE ADDRESSES (new feature) ---
//   const [addresses, setAddresses] = useState(() => {
//     const stored = localStorage.getItem("addresses");
//     return stored ? JSON.parse(stored) : [defaultAddress];
//   });

//   useEffect(() => {
//     localStorage.setItem("addresses", JSON.stringify(addresses));
//   }, [addresses]);

//   // --- Keep profile phone synced with user phone ---
//   useEffect(() => {
//     if (user?.phone && profile?.phone !== user.phone) {
//       setProfile((prev) => ({ ...prev, phone: user.phone }));
//     }
//   }, [user.phone]);

//   // --- Persist everything ---
//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(user));
//   }, [user]);

//   useEffect(() => {
//     localStorage.setItem("profile", JSON.stringify(profile));
//   }, [profile]);

//   useEffect(() => {
//     localStorage.setItem("address", JSON.stringify(address));
//   }, [address]);

//   // --- Helper (optional, to manually update and persist)
//   const updateUserData = (data) => {
//     setUser(data);
//     localStorage.setItem("user", JSON.stringify(data));
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         setUser,
//         updateUserData,
//         profile,
//         setProfile,
//         address,
//         setAddress,
//         addresses, // ✅ newly added
//         setAddresses, // ✅ newly added
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";
import { defaultProfile, defaultAddress } from "../data/defaultData";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // --- USER AUTH STATE ---
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored
      ? JSON.parse(stored)
      : { phone: null, isShopOwner: false, verified: false };
  });

  // --- PROFILE ---
  const [profile, setProfile] = useState(() => {
    const stored = localStorage.getItem("profile");
    const userStored = JSON.parse(localStorage.getItem("user") || "{}");

    return stored
      ? JSON.parse(stored)
      : {
          ...defaultProfile,
          phone: userStored.phone || "",
        };
  });

  // --- SINGLE SELECTED ADDRESS (for backward compatibility) ---
  const [address, setAddress] = useState(() => {
    const stored = localStorage.getItem("address");
    return stored ? JSON.parse(stored) : defaultAddress;
  });

  // --- MULTIPLE ADDRESSES (main list) ---
  const [addresses, setAddresses] = useState(() => {
    const stored = localStorage.getItem("addresses");
    return stored ? JSON.parse(stored) : [defaultAddress];
  });

  // --- Keep profile phone synced with user phone ---
  useEffect(() => {
    if (user?.phone && profile?.phone !== user.phone) {
      setProfile((prev) => ({ ...prev, phone: user.phone }));
    }
  }, [user.phone]);

  // --- Persist all data to localStorage ---
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(address));
  }, [address]);

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  // --- Helper: update user and persist immediately ---
  const updateUserData = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  // --- Helper: add new address ---
  const addAddress = (newAddr) => {
    setAddresses((prev) => {
      const updated = [...prev, newAddr];
      localStorage.setItem("addresses", JSON.stringify(updated));
      return updated;
    });
  };

  // --- Helper: delete address ---
  const deleteAddress = (index) => {
    setAddresses((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem("addresses", JSON.stringify(updated));

      // ✅ If the currently selected address was deleted
      const wasDeleted =
        JSON.stringify(prev[index]) === JSON.stringify(address);

      if (wasDeleted) {
        // fallback to defaultAddress
        setAddress(defaultAddress);
        localStorage.setItem("address", JSON.stringify(defaultAddress));
      }

      return updated.length > 0 ? updated : [defaultAddress];
    });
  };

  // --- Helper: select an existing address as active ---
  const selectAddress = (addr) => {
    setAddress(addr);
    localStorage.setItem("address", JSON.stringify(addr));
  };

  // --- Provide everything globally ---
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUserData,
        profile,
        setProfile,
        address,
        setAddress,
        addresses,
        setAddresses,
        addAddress,
        deleteAddress,
        selectAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
