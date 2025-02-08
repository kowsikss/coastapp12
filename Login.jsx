import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// Firebase config (replace with your credentials)
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+91"); // Default country code
  const [phone, setPhone] = useState("1234567890"); // Default phone number
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);

  // Bypass OTP if default number is used
  const handleBypassLogin = () => {
    if (phone === "1234567890") {
      alert("Logged in without OTP");
      navigate("/home"); // Redirect to home
      return;
    }
  };

  // Send OTP via Firebase
  const sendOtp = () => {
    if (phone === "1234567890") {
      handleBypassLogin();
      return;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });

    signInWithPhoneNumber(auth, `${countryCode}${phone}`, window.recaptchaVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult);
        setShowOtpInput(true);
      })
      .catch((error) => {
        alert("Failed to send OTP: " + error.message);
      });
  };

  // Verify OTP
  const verifyOtp = () => {
    if (verificationId) {
      verificationId
        .confirm(otp)
        .then(() => {
          alert("Login Successful");
          navigate("/home");
        })
        .catch((error) => {
          alert("Invalid OTP: " + error.message);
        });
    }
  };

  return (
    <div className="login-container">
      <h2>Login with Phone</h2>
      
      {/* Country Code Dropdown */}
      <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
        <option value="+91">🇮🇳 +91 (India)</option>
        <option value="+1">🇺🇸 +1 (USA)</option>
        <option value="+44">🇬🇧 +44 (UK)</option>
        <option value="+61">🇦🇺 +61 (Australia)</option>
        <option value="+81">🇯🇵 +81 (Japan)</option>
      </select>

      {/* Phone Number Input */}
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter phone number"
      />

      {/* Send OTP Button */}
      {!showOtpInput && <button onClick={sendOtp}>Send OTP</button>}

      {/* OTP Input & Verify Button */}
      {showOtpInput && (
        <>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Login;
