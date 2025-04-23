import { FaUser, FaCamera, FaEllipsisV, FaShip, FaCommentDots } from "react-icons/fa";

export default function Navbar({ setShowAuth, setCameraOpen, setShowChatbot, setBackgroundVideo }) {
  const handleDirectionClick = (direction) => {
    const videos = {
      East: "assets/east.mp4",
      West: "videos/west.mp4",
      North: "videos/north.mp4",
      South: "videos/south.mp4",
    };
    setBackgroundVideo(videos[direction]);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <FaShip size={28} className="boat-icon" />
        <span className="logo-text">AquaPlore</span>
      </div>

      <div className="nav-links">
        <a href="#">Home</a>
        <a href="/destination">Destination</a>
        <a href="/Trip">Plan Your Trip</a>
        <a href="https://www.beaches.com/blog/">Blog</a>
        <button onClick={() => handleDirectionClick("East")}>East</button>
        <button onClick={() => handleDirectionClick("West")}>West</button>
        <button onClick={() => handleDirectionClick("North")}>North</button>
        <button onClick={() => handleDirectionClick("South")}>South</button>
      </div>

      <div className="nav-icons">
        <button className="icon-btn" onClick={() => setShowAuth(true)}>
          <FaUser size={20} />
        </button>
        <button className="icon-btn" onClick={() => setCameraOpen(true)}>
          <FaCamera size={20} />
        </button>
        <button className="icon-btn" onClick={() => setShowChatbot((prev) => !prev)}>
          <FaCommentDots size={20} />
        </button>
      </div>
    </nav>
  );
}