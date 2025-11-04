import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useProductDetail = (productName) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productName) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch");

        // match by name (case-insensitive)
        const found = data.find(
          (p) =>
            p.name.toLowerCase() ===
            decodeURIComponent(productName).toLowerCase()
        );

        if (!found) {
          setError("Product not found");
          toast.error("Product not found!");
        } else {
          setProduct(found);
        }
      } catch (err) {
        setError(err.message);
        toast.error("Error loading product!");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productName]);

  return { product, loading, error };
};
