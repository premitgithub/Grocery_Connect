import axios from "axios";

const API = "http://localhost:5000/api/cart";

export const addToCartApi = async (phone, productId) => {
  try {
    const res = await axios.post(`${API}/add`, {
      phone,
      productId
    });

    return res.data;

  } catch (error) {
    console.error("Add to cart error:", error);
    return { success: false, message: "Error adding item to cart" };
  }
};

export const fetchFromCartApi = async ( phone ) => {
  try {
    const res = await axios.post(`${API}`, { phone });

    return res.data;

  } catch (error) {
      console.error("Fetch from cart error:", error);
      return { success: false, message: "Error fetching item from cart" };
  }
}

export const removeFromCartApi = async ( phone, productId ) => {
  try {
        console.log(phone);
    console.log(productId);
    const res = await axios.post(`${API}/remove`, { phone, productId });
    console.log(res);

    return res.data;

  } catch (error) {
    console.error("Remove from cart error:", error);
    return { success: false, message: "Error removing item from cart" };
  }
}

export const reduceCartItemApi = async (phone, productId) => {
  try {
    const res = await axios.post(`${API}/reduce`, {phone, productId})

    return res.data;
  } catch (error) {
    console.error("Reduce from cart error:", error);
    return { success: false, message: "Error reducing item from cart" };
  }
}

export const clearCartItemsApi = async (phone) => {
  try {
    const res = await axios.post(`${API}/clear`, {phone})

    return res.data;
  } catch (error) {
    console.error("Clear the cart error:", error);
    return { success: false, message: "Error in Clearing the cart" };
  }
}
