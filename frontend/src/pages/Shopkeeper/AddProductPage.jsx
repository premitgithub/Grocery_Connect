import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [shop, setShop] = useState(null);
    const [showCreateShop, setShowCreateShop] = useState(false);

    // Product Form Data
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Vegetables",
        images: "",
        stock: "",
        brand: "",
    });

    // Shop Form Data
    const [shopData, setShopData] = useState({
        name: "",
        description: "",
        address: "",
        image: "",
    });

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/shops/owner/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.data) {
                    setShowCreateShop(true);
                } else {
                    setShop(res.data);
                }
            } catch (error) {
                console.error("Error fetching shop:", error);
                toast.error("Could not fetch shop details.");
            }
        };

        if (user?.isShopOwner) {
            fetchShop();
        }
    }, [user]);

    const handleProductChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleShopChange = (e) => {
        setShopData({ ...shopData, [e.target.name]: e.target.value });
    };

    const handleCreateShop = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post("http://localhost:5000/api/shops", shopData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setShop(res.data);
            setShowCreateShop(false);
            toast.success("Shop created successfully! Now you can add products.");
        } catch (error) {
            console.error("Error creating shop:", error);
            toast.error("Failed to create shop.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!shop) {
            toast.error("You must have a shop to add products.");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const payload = {
                ...productData,
                price: Number(productData.price),
                stock: Number(productData.stock),
                images: productData.images.split(",").map((img) => img.trim()),
                shopId: shop._id,
            };

            await axios.post("http://localhost:5000/api/products", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Product added successfully!");
            setProductData({
                name: "",
                description: "",
                price: "",
                category: "Vegetables",
                images: "",
                stock: "",
                brand: "",
            });
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Failed to add product.");
        } finally {
            setLoading(false);
        }
    };

    if (!user || !user.isShopOwner) {
        return <div className="p-10 text-center">Access Denied. Shopkeepers only.</div>;
    }

    if (showCreateShop) {
        return (
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
                <h2 className="text-2xl font-bold mb-6 text-center text-teal-700">Create Your Shop</h2>
                <p className="text-center text-gray-600 mb-6">You need to create a shop before adding products.</p>
                <form onSubmit={handleCreateShop} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Shop Name</label>
                        <input
                            type="text"
                            name="name"
                            value={shopData.name}
                            onChange={handleShopChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={shopData.description}
                            onChange={handleShopChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={shopData.address}
                            onChange={handleShopChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Shop Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={shopData.image}
                            onChange={handleShopChange}
                            placeholder="https://example.com/shop.jpg"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition duration-300"
                    >
                        {loading ? "Creating Shop..." : "Create Shop"}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
            <div className="mb-4 text-center text-sm text-gray-500">
                Adding to shop: <span className="font-semibold text-teal-600">{shop?.name}</span>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleProductChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleProductChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={handleProductChange}
                            required
                            min="0"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={productData.stock}
                            onChange={handleProductChange}
                            required
                            min="0"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        name="category"
                        value={productData.category}
                        onChange={handleProductChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Edible Oils">Edible Oils</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Drinks">Drinks</option>
                        <option value="Household">Household</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={productData.brand}
                        onChange={handleProductChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URLs (comma separated)</label>
                    <input
                        type="text"
                        name="images"
                        value={productData.images}
                        onChange={handleProductChange}
                        required
                        placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                >
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
