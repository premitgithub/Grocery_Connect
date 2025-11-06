import { createContext, useState, useEffect, useMemo } from "react";
import { defaultProfile, defaultAddress } from "../data/defaultData";
import toast from "react-hot-toast";

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

  // // --- CART HELPERS ---
  // const addToCart = (product, qty = 1) => {
  //   setCart((prev) => {
  //     const idx = prev.findIndex((p) => p.productId === product._id);
  //     if (idx > -1) {
  //       const updated = [...prev];
  //       updated[idx] = { ...updated[idx], qty: updated[idx].qty + qty };
  //       return updated;
  //     }
  //     return [
  //       ...prev,
  //       {
  //         productId: product._id,
  //         product: {
  //           _id: product._id,
  //           name: product.name,
  //           price: product.price,
  //           images: product.images,
  //           stock: product.stock,
  //         },
  //         qty,
  //       },
  //     ];
  //   });
  // };

  // const setCartQty = (productId, qty) => {
  //   setCart((prev) => {
  //     if (qty <= 0) return prev.filter((p) => p.productId !== productId);
  //     return prev.map((p) => (p.productId === productId ? { ...p, qty } : p));
  //   });
  // };

  // const removeFromCart = (productId) => {
  //   setCart((prev) => prev.filter((p) => p.productId !== productId));
  // };

  // const clearCart = () => setCart([]);
  // --- CART HELPERS (with backend sync) ---
const API_BASE = "http://localhost:5000/api/cart"; // change port if needed

const getAuthHeader = () => {
  const token = localStorage.getItem("token"); // store token during login
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const syncCartFromBackend = async () => {
  try {
    const res = await fetch(API_BASE, { headers: getAuthHeader() });
    const data = await res.json();
    if (data.success) {
      setCart(
        data.cartItems.map((item) => ({
          productId: item.productId._id,
          product: item.productId,
          qty: item.quantity,
        }))
      );
    }
  } catch (err) {
    console.error("Failed to sync cart:", err);
  }
};

useEffect(() => {
  if (user?.phone) {
    syncCartFromBackend();
  }
}, [user?.phone]);

const addToCart = async (product, qty = 1) => {
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
        product,
        qty,
      },
    ];
  });

  // 🔥 Send to backend
  try {
    await fetch(`${API_BASE}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({ productId: product._id, quantity: qty }),
    });
  } catch (err) {
    console.error("Failed to add to backend cart:", err);
  }
};
const setCartQty = async (productId, qty) => {
  setCart((prev) => {
    if (qty <= 0) return prev.filter((p) => p.productId !== productId);
    return prev.map((p) => (p.productId === productId ? { ...p, qty } : p));
  });

  // optional: update backend if you want quantity sync
  try {
    await fetch(`${API_BASE}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({ productId, quantity: qty }),
    });
  } catch (err) {
    console.error("Failed to update qty in backend:", err);
  }
};


const removeFromCart = async (productId) => {
  setCart((prev) => prev.filter((p) => p.productId !== productId));
  try {
    await fetch(`${API_BASE}/${productId}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
  } catch (err) {
    console.error("Failed to remove from backend cart:", err);
  }
};

const clearCart = async () => {
  setCart([]);
  // optional: if you want to clear backend cart too
  try {
    const res = await fetch(API_BASE, {
      headers: getAuthHeader(),
    });
    const data = await res.json();
    if (data.success && data.cartItems) {
      await Promise.all(
        data.cartItems.map((item) =>
          fetch(`${API_BASE}/${item.productId._id}`, {
            method: "DELETE",
            headers: getAuthHeader(),
          })
        )
      );
    }
  } catch (err) {
    console.error("Failed to clear backend cart:", err);
  }
};


  // --- LOGIN MODAL STATE ---
  const [showLoginModal, setShowLoginModal] = useState(false);

  // --- Helper: Require login before performing sensitive actions ---
  const requireLogin = (action) => {
    if (!user?.phone) {
      toast.error("Please log in to continue");
      setShowLoginModal(true);
      return false;
    }
    // if logged in
    if (typeof action === "function") action();
    return true;
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
        // Cart related
        cart,
        setCart,
        addToCart,
        setCartQty,
        removeFromCart,
        clearCart,
        totalItems,
        cartSubtotal,
        showLoginModal,
        setShowLoginModal,
        requireLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};