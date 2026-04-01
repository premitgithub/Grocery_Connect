import React, { useRef, useEffect } from 'react';
import { Bot, X } from 'lucide-react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatWindow = ({ messages, onClose, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="mb-4 bg-white dark:bg-gray-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-none w-[22rem] sm:w-[420px] overflow-hidden flex flex-col border border-gray-100 dark:border-gray-700 h-[38rem]"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 flex justify-between items-center text-white">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-white/20 rounded-full shadow-inner">
            <Bot size={26} />
          </div>
          <div>
            <h3 className="font-bold text-lg tracking-wide">Grocery Assistant</h3>
            <p className="text-xs text-emerald-100 font-semibold tracking-wider uppercase mt-0.5">Online</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close Chat"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-gray-50 dark:bg-gray-900 flex flex-col">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={onSendMessage} />
    </motion.div>
  );
};

export default ChatWindow;
