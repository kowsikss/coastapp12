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
import TripAdvisor from "./components/TripAdvisor";
import MapPage from "./components/MapPage";
import Ne from "./components/New1";
import DestinationPage from "./components/destination"
import Footer from "./components/footer";
import Mys from "./components/CoastalMystery";
import EcoInitiatives from "./components/Eco";
import TasteTheCoast from './components/TasteTheCoast';
import Ocean from"./components/OceanHealthDashboard";
import Blog from "./components/Blog";

function App() {
  return (
    <Routes>
      <Route path="/mystery" element={<Mys />}></Route>
      <Route path="/footer" element={<Footer/>}/>
      <Route path="/" element={<Ne/>}/> 
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/speech" element={<SpeechTextProcessor />} /> {/* ✅ Add this */}
      <Route path="/trip" element={<TripAdvisor></TripAdvisor>} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/destination" element={<DestinationPage />} />
      <Route path="/ecos" element={<EcoInitiatives />} />
      <Route path="/taste" element={<TasteTheCoast />} />
      <Route path="/health" element={<Ocean />} />
      <Route path="/blog" element={<Blog />} />

     
      
      
    </Routes>
  );
}

export default App;
// import { useState } from "react";
// import Navbar from "./components/navbar";
// import TripPlanner from "./components/TripPlanner";
// import Chatbot from "./components/Chatbot";
// import DestinationPage from "./components/DestinationPage";
// import WeatherInfo from "./components/WeatherInfo";
// import CameraModal from "./components/CameraModal";
// import AuthModal from "./components/AuthModal";
// import video from "./assets/video2.mp4";
// import "./components/navbar.css";

// export default function App() {
//   const [showAuth, setShowAuth] = useState(false);
//   const [cameraOpen, setCameraOpen] = useState(false);
//   const [showChatbot, setShowChatbot] = useState(false);
//   const [backgroundVideo, setBackgroundVideo] = useState(video);

//   return (
//     <div className="app-container">
//       {/* Background Video */}
//       <video autoPlay muted loop className="background-video">
//         <source src={backgroundVideo} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Navbar */}
//       <Navbar
//         setShowAuth={setShowAuth}
//         setCameraOpen={setCameraOpen}
//         setShowChatbot={setShowChatbot}
//         setBackgroundVideo={setBackgroundVideo}
//       />

//       {/* Trip Planner */}
//       <TripPlanner />

//       {/* Chatbot */}
//       <Chatbot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />

//       {/* Destination Page */}
//       <DestinationPage />

//       {/* Weather Info */}
//       <WeatherInfo />

//       {/* Camera Modal */}
//       {cameraOpen && <CameraModal setCameraOpen={setCameraOpen} />}

//       {/* Auth Modal */}
//       {showAuth && <AuthModal setShowAuth={setShowAuth} />}
//     </div>
//   );
// }