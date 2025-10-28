// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const Login = () => {
//   const [isLoginMode, setIsLoginMode] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     if (params.get("loading") === "true") {
//       setLoading(true);
//       const timer = setTimeout(() => setLoading(false), 1500);
//       return () => clearTimeout(timer);
//     }
//   }, [location]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-100 via-white to-emerald-100">
//         <div className="flex flex-col items-center space-y-4">
//           <div className="w-16 h-16 border-4 border-t-transparent border-emerald-500 rounded-full animate-spin"></div>
//           <p className="text-emerald-700 font-semibold">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r f">
//       <div className="w-[430px] bg-white p-8 rounded-2xl shadow-lg shadow-gray-300">
//         <div className="flex justify-center mb-4">
//           <h2 className="text-3xl font-semibold text-center">
//             {isLoginMode ? "Login" : "SignUp"}
//           </h2>
//         </div>

//         {/* Tab controls */}
//         <div className="relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">
//           <button
//             onClick={() => setIsLoginMode(true)}
//             className={`w-1/2 text-lg font-medium transition-all z-10 ${
//               isLoginMode ? "text-white" : "text-black"
//             }`}
//           >
//             Login
//           </button>
//           <button
//             onClick={() => setIsLoginMode(false)}
//             className={`w-1/2 text-lg font-medium transition-all z-10 ${
//               !isLoginMode ? "text-white" : "text-black"
//             }`}
//           >
//             SignUp
//           </button>
//           <div
//             className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 ${
//               isLoginMode ? "left-0" : "left-1/2"
//             }`}
//             style={{ transition: "left 0.5s ease-in" }}
//           ></div>
//         </div>

//         {/* Form section */}
//         <form className="space-y-4">
//           {!isLoginMode && (
//             <input
//               type="text"
//               placeholder="Name"
//               required
//               className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email Address"
//             required
//             className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             required
//             className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
//           />

//           {!isLoginMode && (
//             <input
//               type="password"
//               placeholder="Confirm password"
//               required
//               className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
//             />
//           )}

//           {isLoginMode && (
//             <div className="text-right">
//               <p className="text-cyan-600 hover:underline cursor-pointer">
//                 Forgot password
//               </p>
//             </div>
//           )}

//           <button className="w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition">
//             {isLoginMode ? "Login" : "SignUp"}
//           </button>

//           <p className="text-center text-gray-600">
//             {isLoginMode
//               ? "Don't have an account? "
//               : "Already have an account? "}
//             <a
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setIsLoginMode(!isLoginMode);
//               }}
//               className="text-cyan-600 hover:underline"
//             >
//               {isLoginMode ? "SignUp Now" : "Login Now"}
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("loading") === "true") {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-100 via-white to-emerald-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-t-transparent border-emerald-500 rounded-full animate-spin"></div>
          <p className="text-emerald-700 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-100 via-white to-teal-100">
      <div className="w-[600px] bg-white p-12 rounded-3xl shadow-2xl shadow-gray-400">
        <div className="flex justify-center mb-6">
          <h2 className="text-4xl font-semibold text-center">
            {isLoginMode ? "Login" : "Sign Up"}
          </h2>
        </div>

        {/* Tab controls */}
        <div className="relative flex h-14 mb-8 border border-gray-950 rounded-3xl overflow-hidden">
          <button
            onClick={() => setIsLoginMode(true)}
            className={`w-1/2 text-lg font-medium transition-all z-10 ${
              isLoginMode ? "text-white" : "text-black"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginMode(false)}
            className={`w-1/2 text-lg font-medium transition-all z-10 ${
              !isLoginMode ? "text-white" : "text-black"
            }`}
          >
            Sign Up
          </button>
          <div
            className={`absolute top-0 h-full w-1/2 rounded-3xl bg-gradient-to-r from-emerald-700 to-emerald-500 ${
              isLoginMode ? "left-0" : "left-1/2"
            }`}
            style={{ transition: "left 0.5s ease-in" }}
          ></div>
        </div>

        {/* Form section */}
        <form className="space-y-5">
          {!isLoginMode && (
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full p-4 border-b-2 border-gray-300 outline-none focus:border-emerald-500 placeholder-gray-400"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full p-4 border-b-2 border-gray-300 outline-none focus:border-emerald-500 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-4 border-b-2 border-gray-300 outline-none focus:border-emerald-500 placeholder-gray-400"
          />

          {!isLoginMode && (
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="w-full p-4 border-b-2 border-gray-300 outline-none focus:border-emerald-500 placeholder-gray-400"
            />
          )}

          {isLoginMode && (
            <div className="text-right">
              <p className="text-black hover:underline cursor-pointer">
                Forgot password?
              </p>
            </div>
          )}

          <button className="w-full p-4 bg-gradient-to-r from-emerald-700 to-emerald-500 text-white rounded-3xl text-2xl font-medium hover:opacity-90 transition">
            {isLoginMode ? "Login" : "Sign Up"}
          </button>

          <p className="text-center text-gray-600">
            {isLoginMode
              ? "Don't have an account? "
              : "Already have an account? "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginMode(!isLoginMode);
              }}
              className="text-emerald-600 hover:underline"
            >
              {isLoginMode ? "Sign Up Now" : "Login Now"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
