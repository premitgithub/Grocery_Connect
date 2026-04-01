import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWindow from './ChatWindow';
import ChatbotIntroPopup from './ChatbotIntroPopup';
import { UserContext } from '../../context/UserContext';

const INITIAL_MESSAGE = {
  id: Date.now(),
  text: 'Hello! I am the Grocery Connect Assistant. How can I help you today?',
  sender: 'bot',
  timestamp: Date.now(),
};

const ChatbotWidget = () => {
  const { user, loadCartFromDataBase } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const lastLocation = useRef(location.pathname);

  const [isOpen, setIsOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatbot_messages');
    if (savedMessages) {
      try {
        return JSON.parse(savedMessages);
      } catch (e) {
        return [INITIAL_MESSAGE];
      }
    }
    return [INITIAL_MESSAGE];
  });

  useEffect(() => {
    localStorage.setItem('chatbot_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    // Show intro on every refresh after a short delay
    const timer = setTimeout(() => setShowIntro(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Checkout Location Tracker
  useEffect(() => {
    if (location.pathname === '/checkout' && lastLocation.current !== '/checkout') {
       if (!isOpen) setIsOpen(true);
       
       const checkoutPrompt = {
          id: Date.now(),
          text: "All set! You can proceed with payment 💳. Please review your methods and securely input your details manually.",
          sender: 'bot',
          timestamp: Date.now(),
          intent: 'checkout_guidance'
       };
       setMessages(prev => [...prev, checkoutPrompt]);
    }
    lastLocation.current = location.pathname;
  }, [location.pathname]);

  const handleCloseIntro = () => {
    setShowIntro(false);
  };

  const handleOpenFromIntro = () => {
    handleCloseIntro();
    setIsOpen(true);
  };

  const handleSendMessage = async (text) => {
    const newUserMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, userId: user?._id, phoneNumber: user?.phoneNumber })
      });
      const data = await res.json();
      
      if (res.ok) {
        const botResponse = {
          id: Date.now() + 1,
          text: data.message,
          sender: 'bot',
          timestamp: Date.now() + 1,
          intent: data.intent,
          payload: data.data
        };
        setMessages((prev) => [...prev, botResponse]);

        // Sync local context if items were added to database cart
        if (['add_to_cart', 'clear_cart', 'remove_item', 'update_quantity'].includes(data.intent)) {
           loadCartFromDataBase();
        }

        // Navigation Actions
        if (data.intent === 'review_cart') {
           setTimeout(() => navigate('/cart'), 1500);
        } else if (data.intent === 'proceed_checkout') {
           setTimeout(() => navigate('/checkout'), 1500);
        }
      } else {
         throw new Error(data.error || "Server error");
      }
    } catch (err) {
      console.error(err);
      const errorMsg = {
        id: Date.now() + 1,
        text: err.message || "Something went wrong, please try again.",
        sender: 'bot',
        timestamp: Date.now() + 1,
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="fixed bottom-6 right-28 z-[10000] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <ChatWindow 
            messages={messages} 
            onClose={() => setIsOpen(false)} 
            onSendMessage={handleSendMessage} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && showIntro && (
          <ChatbotIntroPopup 
            onAskQuestion={handleOpenFromIntro} 
            onClose={handleCloseIntro} 
          />
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-4 bg-emerald-600 text-white rounded-3xl shadow-lg hover:shadow-emerald-500/40 hover:shadow-2xl flex items-center justify-between gap-3 transition-all border-[3px] border-white dark:border-gray-900 select-none min-w-[170px] cursor-pointer"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? (
          <div className="flex w-full justify-between items-center px-1">
            <span className="font-semibold text-[17px]">Close Chat</span>
            <X size={24} className="opacity-90 ml-3" />
          </div>
        ) : (
          <div className="flex w-full justify-between items-center px-1">
            <div className="font-semibold text-[17px] flex items-center">
              <span className="relative flex h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              Chat with us
            </div>
            <MessageCircle size={24} className="opacity-90 ml-3" />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default ChatbotWidget;
