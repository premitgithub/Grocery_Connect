import { createContext, useState, useEffect, useMemo } from "react";
import { defaultProfile, defaultAddress } from "../data/defaultData";
import toast from "react-hot-toast";
import { addToCartApi, fetchFromCartApi, removeFromCartApi, reduceCartItemApi,clearCartItemsApi } from "../api/cartApi"

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
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user?.phone) {
      loadCartFromDataBase();
    }
  }, [user.phone]);

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

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  // --- Helper: update user and persist immediately ---
  const updateUserData = async(data) => {
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

  const addToCart = async ( product ) => {
    if (!user?.phone) {
      toast.error("Please log in first");
      setShowLoginModal(true);
      return;
    }

    try {
      const res = await addToCartApi(user.phone, product);
      // console.log("Phone: ", user.phone)
      // console.log("Product: ", product)
      
      // const updatedCart = res;
      // console.log(res);
      // setCart(updatedCart);
      await loadCartFromDataBase();
      toast.success("Added to cart!");

    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("Something went wrong");
    }
  };

  const loadCartFromDataBase = async () => {
    if (!user?.phone) return;
    try {
      const data = await fetchFromCartApi(user.phone);

      const formatted = data.map((item) => ({
      productId: item.productId._id,
      qty: item.quantity,
      product: item.productId,   // full product details after populate()
    }));
    setCart(formatted);

    } catch (error) {
      console.error("Failed to load cart: ", error);
    }
  };


  const increaseCartQuantity = async (productId, qty) => {

    await addToCartApi(user.phone, productId);
    await loadCartFromDataBase();
  };

  const decreaseCartQuantity = async (productId, qty ) => {
    if (qty === 1){
      return removeFromCart( productId );
    }
    await reduceCartItemApi( user.phone, productId );
    await loadCartFromDataBase();
  }

  const removeFromCart = async (productId) => {
    await removeFromCartApi(user.phone, productId);
    await loadCartFromDataBase();
  };

  const clearCartItems = async (phone) => {
    await clearCartItemsApi(user.phone);
    await loadCartFromDataBase();
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