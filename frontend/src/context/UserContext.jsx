import { createContext, useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import {
  addToCartApi,
  fetchFromCartApi,
  reduceCartItemApi,
  removeFromCartApi,
  clearCartItemsApi,
} from "../api/cartApi";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // --- USER & PROFILE STATE ---
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : {};
  });
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profile");
    return saved ? JSON.parse(saved) : {};
  });
  const [address, setAddress] = useState(() => {
    const saved = localStorage.getItem("address");
    return saved ? JSON.parse(saved) : null;
  });
  const [addresses, setAddresses] = useState([]);

  // --- CART STATE ---
  const [cart, setCart] = useState([]);

  // --- LOGIN MODAL STATE ---
  const [showLoginModal, setShowLoginModal] = useState(false);

  // --- HELPER FUNCTIONS ---

  const updateUserData = async (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const res = await fetch("http://localhost:5000/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: user.phoneNumber, ...updatedData }),
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data.user);
        setUser(data.user); // Update user state as well if needed
        localStorage.setItem("profile", JSON.stringify(data.user));
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Something went wrong");
    }
  };

  const addAddress = (newAddr) => {
    setAddresses((prev) => {
      const updated = [...prev, newAddr];
      return updated;
    });
  };

  const deleteAddress = (index) => {
    setAddresses((prev) => prev.filter((_, i) => i !== index));
  };

  const selectAddress = (addr) => {
    setAddress(addr);
    localStorage.setItem("address", JSON.stringify(addr));
  };

  // --- CART API FUNCTIONS ---

  const loadCartFromDataBase = async () => {
    if (!user?.phoneNumber) return;
    try {
      const data = await fetchFromCartApi(user.phoneNumber);
      const formatted = data.map((item) => ({
        productId: item.productId._id,
        qty: item.quantity,
        product: item.productId,
      }));
      setCart(formatted);
    } catch (error) {
      console.error("Failed to load cart: ", error);
    }
  };

  const addToCart = async (product, quantity = 1, showToast = true) => {
    if (!user?.phoneNumber) {
      if (showToast) toast.error("Please log in first");
      setShowLoginModal(true);
      return;
    }
    try {
      await addToCartApi(user.phoneNumber, product, quantity);
      await loadCartFromDataBase();
      if (showToast) toast.success("Added to cart!");
    } catch (error) {
      console.error("Add to cart failed:", error);
      if (showToast) toast.error("Something went wrong");
    }
  };

  const removeFromCart = async (productId) => {
    await removeFromCartApi(user.phoneNumber, productId);
    await loadCartFromDataBase();
  };

  const increaseCartQuantity = async (productId, qty) => {
    await addToCartApi(user.phoneNumber, productId);
    await loadCartFromDataBase();
  };

  const decreaseCartQuantity = async (productId, qty) => {
    if (qty === 1) {
      return removeFromCart(productId);
    }
    await reduceCartItemApi(user.phoneNumber, productId);
    await loadCartFromDataBase();
  };

  const clearCartItems = async (phoneNumber) => {
    await clearCartItemsApi(user.phoneNumber);
    await loadCartFromDataBase();
  };

  const requireLogin = (action) => {
    if (!user?.phoneNumber) {
      toast.error("Please log in to continue");
      setShowLoginModal(true);
      return false;
    }
    if (typeof action === "function") action();
    return true;
  };

  // --- EFFECTS ---

  // Load cart on login
  useEffect(() => {
    if (user?.phoneNumber) {
      loadCartFromDataBase();
    }
  }, [user.phoneNumber]);

  // Sync profile phone
  useEffect(() => {
    if (user?.phoneNumber && profile?.phoneNumber !== user.phoneNumber) {
      setProfile((prev) => ({ ...prev, phoneNumber: user.phoneNumber }));
    }
  }, [user.phoneNumber]);

  // Persist data
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(address));
  }, [address]);

  // --- DERIVED VALUES ---
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

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUserData,
        updateUserProfile,
        profile,
        setProfile,
        address,
        setAddress,
        addresses,
        setAddresses,
        addAddress,
        deleteAddress,
        selectAddress,
        cart,
        setCart,
        addToCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        clearCartItems,
        loadCartFromDataBase,
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