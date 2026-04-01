import React from 'react';
import { motion } from 'framer-motion';
import { Bot, X } from 'lucide-react';

const ChatbotIntroPopup = ({ onAskQuestion, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, x: 20 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      className="mb-8 bg-white dark:bg-gray-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-5 w-80 border border-emerald-100 dark:border-gray-700 relative"
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        aria-label="Close intro"
      >
        <X size={16} />
      </button>

      <div className="flex items-start gap-4 mt-1">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", bounce: 0.6 }}
          className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 p-3 rounded-full flex-shrink-0 shadow-sm"
        >
          <Bot size={28} />
        </motion.div>
        
        <div className="pt-1.5">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-800 dark:text-gray-200 font-bold text-[16px] leading-relaxed mb-4 pr-3"
          >
            Hi! 👋 Do you need help with anything?
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex gap-2.5"
          >
            <button
              onClick={onAskQuestion}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-semibold rounded-xl transition-colors flex items-center justify-center flex-1 shadow-sm"
            >
              Ask a question
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-[14px] font-semibold rounded-xl transition-colors flex-[0.7]"
            >
              Close
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatbotIntroPopup;
