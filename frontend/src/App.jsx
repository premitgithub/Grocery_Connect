// import React from "react";
// import Login from "./components/LoginPage/Login";
// import Navbar from "./components/Navbar/Navbar";
// import HomePage from "./pages/HomePage";
// const App = () => {
//   // return (
//   //   <div className="relative w-full h-screen overflow-hidden">
//   //     {/* Hazy background layer */}
//   //     <div className="absolute inset-0 bg-cyan-300/10 backdrop-blur-md z-0" />

//   //     {/* Foreground content */}
//   //     <div className="relative z-10">
//   //       <Navbar />
//   //       <div className="grid w-full h-[calc(100vh-80px)] place-items-center">
//   //         <Login />
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
//   return <HomePage />;
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/LoginPage/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
