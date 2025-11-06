// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiSearch, FiX } from "react-icons/fi";

// const SearchBar = ({ isOpen, onClose }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.25, ease: "easeOut" }}
//           className="
//             absolute 
//             top-full 
//             right-25 
//             mt-2
//             bg-white 
//             border border-gray-200 
//             shadow-md 
//             rounded-xl 
//             px-5 py-5 
//             z-50 
//             flex 
//             items-center 
//             w-[250px] sm:w-[300px] md:w-[350px]
//           "
//         >
//           <FiSearch className="text-teal-600 text-xl mr-2 shrink-0" />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="flex-1 text-lg border-none outline-none focus:ring-0 placeholder-gray-400"
//             autoFocus
//           />
//           <button
//             onClick={onClose}
//             className="text-gray-500 py-2 px-2 bg-gray-100 hover:text-teal-600 hover:bg-gray-300 duration-300 rounded-2xl transition ml-2"
//           >
//             <FiX className="text-xl cursor-pointer " />
//           </button>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default SearchBar;

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiSearch, FiX } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const SearchBar = ({ isOpen, onClose }) => {
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && query.trim() !== "") {
//       navigate(`/search?query=${encodeURIComponent(query.trim())}`);
//       onClose(); // close the search bar after navigating
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.25, ease: "easeOut" }}
//           className="
//             absolute 
//             top-full 
//             right-10 
//             mt-2
//             bg-white 
//             border border-gray-200 
//             shadow-md 
//             rounded-xl 
//             px-5 py-4 
//             z-50 
//             flex 
//             items-center 
//             w-[250px] sm:w-[300px] md:w-[350px]
//           "
//         >
//           <FiSearch className="text-teal-600 text-xl mr-2 shrink-0" />
//           <input
//             type="text"
//             placeholder="Search..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={handleKeyDown}
//             className="flex-1 text-lg border-none outline-none focus:ring-0 placeholder-gray-400"
//             autoFocus
//           />
//           <button
//             onClick={onClose}
//             className="text-gray-500 py-2 px-2 bg-gray-100 hover:text-teal-600 hover:bg-gray-300 duration-300 rounded-2xl transition ml-2"
//           >
//             <FiX className="text-xl cursor-pointer" />
//           </button>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default SearchBar;
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="
            absolute top-full right-25 mt-2
            bg-white border border-gray-200 shadow-md rounded-xl
            px-5 py-5 z-50 flex items-center
            w-[250px] sm:w-[300px] md:w-[350px]
          "
        >
          <form onSubmit={handleSearch} className="flex items-center w-full">
            <FiSearch className="text-teal-600 text-xl mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search products, categories, shops..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-lg border-none outline-none focus:ring-0 placeholder-gray-400"
              autoFocus
            />
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 py-2 px-2 bg-gray-100 hover:text-teal-600 hover:bg-gray-300 duration-300 rounded-2xl transition ml-2"
            >
              <FiX className="text-xl cursor-pointer" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
