//  import React, { useState } from "react";
//  import Login from "./components/Login";
// import HomePage from "./components/HomePage";

//  const App = () => {
//  const [isAuthenticated, setIsAuthenticated] = useState(false);

//    return(
//      <div>
//        <Login />
//      </div>
//    );
//  };
//     (
//      <div>
//    {!isAuthenticated ? (
//           <Login onSuccess={() => setIsAuthenticated(true)} />
//        ) : (
//      <HomePage />
//    )}
//  </div>
// );

//  export default App;

import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SpeechTextProcessor from "./components/SpeechTextProcessor"; // Import chatbot

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/speech" element={<SpeechTextProcessor />} /> {/* ✅ Add this */}
    </Routes>
  );
}

export default App;
