import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

const ShopDashboard = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Shop Settings State
  const [shopProfile, setShopProfile] = useState(null);
  const [isEditingShop, setIsEditingShop] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: "", address: "", description: "", image: "" });

  const fetchShopData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const shopRes = await axios.get("http://localhost:5000/api/shops/owner/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (shopRes.data) {
        setShopProfile(shopRes.data);
        setEditFormData({
          name: shopRes.data.name || "",
          address: shopRes.data.address || "",
          description: shopRes.data.description || "",
          image: shopRes.data.image || "",
        });
      }

      const res = await axios.get("http://localhost:5000/api/orders/shop", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchShopData();
    }
  }, [user]);

  const handleUpdateShop = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:5000/api/shops/owner/me", editFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if(res.data) {
        toast.success("Shop Profile updated successfully!");
        setShopProfile(res.data.shop);
        setIsEditingShop(false);
        // refresh the order data as well in case the address change affected them? (Optional)
      }
    } catch (err) {
      toast.error("Failed to update shop details");
      console.error(err);
    }
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
        status: "Pending"
      });
      if (res.status === 200) {
        toast.success("Order accepted and sent to delivery partners!", { icon: "✅" });
        fetchShopData();
      }
    } catch (error) {
       console.error(error);
       toast.error(error.response?.data?.message || "Failed to accept order");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent animate-spin rounded-full"></div>
      </div>
    );
  }

  const reviewOrders = orders.filter(o => o.status === "Under Review");
  const activeOrders = orders.filter(o => ["Pending", "Accepted", "Picked Up", "Out for Delivery"].includes(o.status));
  const pastOrders = orders.filter(o => ["Delivered", "Rejected"].includes(o.status));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Shop Dashboard</h1>
          {shopProfile && <p className="text-gray-500 mt-1">{shopProfile.name} • {shopProfile.address}</p>}
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsEditingShop(true)} 
            className="bg-white border border-gray-300 text-gray-700 font-semibold px-4 py-2 rounded shadow-sm hover:bg-gray-50 transition"
          >
            ⚙️ Shop Settings
          </button>
          <button onClick={fetchShopData} className="bg-teal-50 text-teal-700 font-semibold px-4 py-2 rounded shadow hover:bg-teal-100 transition">
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Edit Shop Modal */}
      {isEditingShop && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl relative animate-fadeIn">
             <button onClick={() => setIsEditingShop(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl font-bold">&times;</button>
             <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">⚙️ Edit Shop Profile</h2>
             <form onSubmit={handleUpdateShop} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Shop Name</label>
                  <input required value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="E.g., Fresh Mart" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                  <textarea value={editFormData.description} onChange={(e) => setEditFormData({...editFormData, description: e.target.value})} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 outline-none" rows="2" placeholder="Tell customers about your shop..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Full Address (Will be mapped)</label>
                  <input required value={editFormData.address} onChange={(e) => setEditFormData({...editFormData, address: e.target.value})} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Exact Location e.g., Park Street, Kolkata" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Shop Image URL</label>
                  <input value={editFormData.image} onChange={(e) => setEditFormData({...editFormData, image: e.target.value})} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="https://..." />
                </div>
                <div className="flex justify-end pt-4 gap-3">
                  <button type="button" onClick={() => setIsEditingShop(false)} className="px-5 py-2 rounded-lg font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-lg font-bold bg-teal-600 text-white hover:bg-teal-700 shadow flex items-center gap-2">Save Profile</button>
                </div>
             </form>
          </div>
        </div>
      )}

      {/* Under Review Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-teal-700 mb-4 border-b pb-2">New Orders (Under Review)</h2>
        {reviewOrders.length === 0 ? (
          <p className="text-gray-500 italic">No new orders waiting for your review.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewOrders.map(order => (
              <div key={order._id} className="bg-white border rounded-xl shadow-sm overflow-hidden p-5 flex flex-col items-start gap-3 justify-between">
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">ID: {order._id.substring(order._id.length - 6)}</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">Review Needed</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{order.customer?.name || order.customerName || "Customer"}</h3>
                  <p className="text-sm text-gray-600 mb-4 truncate">{order.items.length} items • ₹{order.totalAmount}</p>
                </div>
                <button 
                  onClick={() => handleAcceptOrder(order._id)}
                  className="w-full bg-teal-600 text-white font-bold py-2 rounded-lg hover:bg-teal-700 transition shadow-md"
                >
                  Accept & Request Delivery
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Orders Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">Active Orders (With Delivery)</h2>
        {activeOrders.length === 0 ? (
          <p className="text-gray-500 italic">No active orders currently.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeOrders.map(order => (
              <div key={order._id} className="bg-gray-50 border rounded-xl p-5 shadow-inner">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-500">ID: {order._id.substring(order._id.length - 6)}</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">{order.status}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-700">{order.customer?.name || order.customerName || "Customer"}</h3>
                  <p className="text-sm text-gray-600 mb-1">Total: ₹{order.totalAmount}</p>
                  <p className="text-xs text-gray-400 mt-2">Delivery Partner: {order.deliveryPartner?.name || "Assigning..."}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopDashboard;
