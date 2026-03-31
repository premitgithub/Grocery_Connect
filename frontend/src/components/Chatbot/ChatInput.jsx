import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="flex gap-3 items-center relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-full py-4 pl-6 pr-14 text-[16px] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all border border-transparent dark:border-gray-700"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="absolute right-2 p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-emerald-600 shadow-md transform hover:scale-105 active:scale-95"
          aria-label="Send Message"
        >
          <Send size={20} className="ml-0.5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
