import React from 'react';
import { Bot, User, Truck, Clock, ShoppingCart, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-3 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 mt-auto mb-1.5 rounded-full p-2 ${isUser ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300'}`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>
        <div className="flex flex-col">
          <div
            className={`px-5 py-3.5 rounded-[1.25rem] text-[16px] leading-relaxed shadow-sm ${
              isUser
                ? 'bg-emerald-600 text-white rounded-br-sm'
                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-bl-sm font-medium'
            }`}
          >
            <div className="whitespace-pre-line">{message.text}</div>

            {/* Structured Data rendering for Order Tracking */}
            {!isUser && message.intent === 'order_tracking' && message.payload?.orderId && (
              <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-3 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[14px]">
                  <Truck size={16} className="text-emerald-500" />
                  <span className="text-gray-500 dark:text-gray-400">Status:</span>
                  <span className={`font-semibold ${message.payload.status === 'Delivered' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {message.payload.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[14px]">
                  <Clock size={16} className="text-emerald-500" />
                  <span className="text-gray-500 dark:text-gray-400">ETA:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {message.payload.eta}
                  </span>
                </div>
                
                <div className="mt-2">
                  <Link
                    to={`/track/${message.payload.orderId}`}
                    className="inline-block w-full text-center px-4 py-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-semibold rounded-lg text-sm transition-colors border border-emerald-200 dark:border-emerald-800"
                  >
                    Track Order
                  </Link>
                </div>
              </div>
            )}

            {/* Structured Data rendering for Add to Cart */}
            {!isUser && message.intent === 'add_to_cart' && message.payload?.items?.length > 0 && (
              <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-3 flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  {message.payload.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[14px] bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-emerald-500" />
                        <span className="font-medium text-gray-800 dark:text-gray-200">{item.name}</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 font-semibold">₹{item.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-2">
                  <Link
                    to="/cart"
                    className="inline-flex w-full justify-center items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm transition-colors shadow-sm"
                  >
                    <ShoppingCart size={16} />
                    Review Cart
                  </Link>
                </div>
              </div>
            )}
          </div>
          <span className={`text-[10px] text-gray-400 mt-1.5 px-2 ${isUser ? 'text-right' : 'text-left'}`}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
