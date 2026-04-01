import React, { useContext } from "react";
import { FiBell, FiCheck, FiPackage } from "react-icons/fi";
import { NotificationContext } from "../../context/NotificationContext";
import { formatDistanceToNow } from "date-fns";

const NotificationDropdown = ({ isOpen, onClose }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useContext(NotificationContext);

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-14 w-80 md:w-96 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 z-50 overflow-hidden text-sm">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
        <h3 className="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <FiBell className="text-emerald-600" /> Notifications
        </h3>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
            <FiPackage className="text-4xl text-gray-300 dark:text-slate-600 mb-2" />
            <p>No new notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification._id}
              onClick={() => {
                if (!notification.read) markAsRead(notification._id);
              }}
              className={`p-4 border-b border-gray-50 dark:border-slate-700/50 cursor-pointer transition-colors duration-200 ${
                notification.read 
                  ? "bg-white dark:bg-slate-800 opacity-70" 
                  : "bg-teal-50/50 dark:bg-teal-900/20"
              } hover:bg-gray-50 dark:hover:bg-slate-700/50`}
            >
              <div className="flex justify-between items-start gap-2">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {notification.type === "ORDER_PLACED" ? "🎉 Order Placed" : "🛒 New Order"}
                </span>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mt-1 mb-2">
                {notification.message}
              </p>

              {notification.metadata && notification.type === "NEW_ORDER_RECEIVED" && (
                <div className="bg-white dark:bg-slate-900 rounded border border-gray-100 dark:border-slate-700 p-2 text-xs space-y-1 mt-2">
                  <div className="grid grid-cols-12 gap-1">
                    <span className="col-span-4 text-gray-500 dark:text-gray-400 font-medium">Order ID:</span>
                    <span className="col-span-8 text-gray-700 dark:text-gray-300 truncate font-mono">{notification.metadata.orderId}</span>
                    
                    <span className="col-span-4 text-gray-500 dark:text-gray-400 font-medium">Items:</span>
                    <span className="col-span-8 text-gray-700 dark:text-gray-300">{notification.metadata.itemsSummary}</span>
                    
                    <span className="col-span-4 text-gray-500 dark:text-gray-400 font-medium">Address:</span>
                    <span className="col-span-8 text-gray-700 dark:text-gray-300 capitalize truncate" title={notification.metadata.customerAddress}>
                      {notification.metadata.customerAddress}
                    </span>
                  </div>
                </div>
              )}

              {notification.metadata && notification.type === "ORDER_PLACED" && (
                 <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                   ID: {notification.metadata.orderId}
                 </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className="p-2 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 text-center">
        <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">
          Close List
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
