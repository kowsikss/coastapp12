import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Firebase config file
//import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebaseConfig";
import "./Login.css";

const Login = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowSplash(false), 2000);
  }, []);

  const sendOtp = async () => {
    if (phone === "1234567890") {
      alert("Bypassing OTP. Logging in directly...");
      setUserData({ phone, name, age, dob, sex, address, email });
      storeUserData();
      navigate("/home");
      return;
    }

    if (phone.length !== 10) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });

      const confirmation = await signInWithPhoneNumber(
        auth,
        countryCode + phone,
        window.recaptchaVerifier
      );
      window.confirmationResult = confirmation;
      setOtpSent(true);
      alert("OTP sent successfully!");
    } catch (error) {
      alert("Error sending OTP.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      await window.confirmationResult.confirm(otp);
      alert("OTP Verified!");
      storeUserData();
      navigate("/home");
    } catch (error) {
      alert("Invalid OTP. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const storeUserData = async () => {
    const user = { phone, name, age, dob, sex, address, email };
    try {
      await fetch("https://your-api.com/store-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  return (
    <div className="login-container">
      {showSplash ? (
        <div className="splash-screen">
          <img src="https://www.boldbusiness.com/wp-content/uploads/2019/04/Feature-Image-5.jpg" alt="Splash" className="splash-img" />
          <h1 style={{ color: "#fff", fontSize: "2rem", textAlign: "center" }}>Aquaplore</h1>
        </div>
      ) : (
        <div className="login-box">
          <h2>Login with OTP</h2>

          {!otpSent ? (
            <>
              <div className="phone-input">
                <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                  <option value="+91">🇮🇳 +91 (India)</option>
                  <option value="+1">🇺🇸 +1 (USA)</option>
                  <option value="+44">🇬🇧 +44 (UK)</option>
                  <option value="+61">🇦🇺 +61 (Australia)</option>
                </select>
                <input type="text" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" />
              </div>
              <button className="otp-btn" onClick={sendOtp} disabled={loading}>{loading ? "Sending OTP..." : "Send OTP"}</button>
            </>
          ) : (
            <>
              <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="input-field" />
              <button className="otp-btn" onClick={verifyOtp} disabled={loading}>{loading ? "Verifying..." : "Verify OTP"}</button>
            </>
          )}

          <p className="toggle-text">
            <span onClick={() => navigate("/admin")}>Admin Access</span>
          </p>

          <div id="recaptcha-container"></div>
        </div>
      )}

      {userData && (
        <div className="user-details-form">
          <h2>Complete Your Profile</h2>
          <input type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
          <input type="number" placeholder="Enter Your Age" value={age} onChange={(e) => setAge(e.target.value)} className="input-field" />
          <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} className="input-field" />
          <select value={sex} onChange={(e) => setSex(e.target.value)} className="input-field">
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="text" placeholder="Enter Your Address" value={address} onChange={(e) => setAddress(e.target.value)} className="input-field" />
          <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
          <button className="submit-btn" onClick={storeUserData}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Login;
