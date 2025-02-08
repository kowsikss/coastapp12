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
import SpeechTextProcessor from "./components/SpeechTextProcessor"; // Ensure this component exists

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/SpeechTextProcessor" element={<SpeechTextProcessor />} /> {/* Add this */}
    </Routes>
  );
};

export default App;



