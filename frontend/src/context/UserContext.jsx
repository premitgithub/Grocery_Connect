import { createContext, useState, useEffect, useMemo } from "react";
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

  // --- CART STATE ---
  // Array of { productId, product (snapshot), qty }
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // --- CART DERIVED VALUES ---
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + (item.qty || 0), 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + Number(item.product?.price || 0) * item.qty,
        0
      ),
    [cart]
  );

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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

  // --- CART HELPERS ---
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.productId === product._id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + qty };
        return updated;
      }
      return [
        ...prev,
        {
          productId: product._id,
          product: {
            _id: product._id,
            name: product.name,
            price: product.price,
            images: product.images,
            stock: product.stock,
          },
          qty,
        },
      ];
    });
  };

  const setCartQty = (productId, qty) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((p) => p.productId !== productId);
      return prev.map((p) => (p.productId === productId ? { ...p, qty } : p));
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.productId !== productId));
  };

  const clearCart = () => setCart([]);

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
        // Cart related
        cart,
        setCart,
        addToCart,
        setCartQty,
        removeFromCart,
        clearCart,
        totalItems,
        cartSubtotal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};