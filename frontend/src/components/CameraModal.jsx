import { useRef } from "react";

export default function CameraModal({ setCameraOpen }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const openCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Camera access denied:", err));
  };

  const handleImageCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageSrc = canvas.toDataURL("image/jpeg");
    setCameraOpen(false);
    // Handle image analysis here
  };

  return (
    <div className="camera-modal">
      <video ref={videoRef} autoPlay className="camera-view"></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <button onClick={handleImageCapture} className="capture-btn">
        Capture Image
      </button>
      <button onClick={() => setCameraOpen(false)} className="close-camera-btn">
        Close Camera
      </button>
    </div>
  );
}