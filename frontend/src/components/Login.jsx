// import React, { useState, useEffect } from "react";

//import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebaseConfig";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// const Login = () => {
//   const [showSplash, setShowSplash] = useState(true);
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [countryCode, setCountryCode] = useState("+91");
//   const [email, setEmail] = useState("");
//   const [emailOtp, setEmailOtp] = useState("");
//   const [emailSent, setEmailSent] = useState(false);
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [selectedMethod, setSelectedMethod] = useState("");

//   // Profile details
//   const [profilePic, setProfilePic] = useState(null);
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [dob, setDob] = useState("");
//   const [sex, setSex] = useState("");
//   const [address, setAddress] = useState("");
//   const [location, setLocation] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => setShowSplash(false), 2000);
//   }, []);
     


//   const sendOtp = async () => {
//     if (phone === "1234567890") {
//       alert("Bypassing OTP. Redirecting to Home...");
//       navigate("/home");
//       return;
//     }
//     if (phone.length !== 10) {
//       alert("Enter a valid 10-digit phone number.");
//       return;
//     }
//     setOtpSent(true);
//     alert("Simulated OTP sent to phone!");
//   };

//   const verifyOtp = () => {
//     if (otp.length === 6 || phone === "1234567890") {
//       alert("Phone OTP Verified!");
//       navigate("/profile");
//     } else {
//       alert("Invalid OTP. Try again.");
//     }
//   };

//   const sendEmailOtp = () => {
//     if (!email.includes("@") || !email.includes(".")) {
//       alert("Enter a valid email address.");
//       return;
//     }
//     setEmailSent(true);
//     alert("Simulated OTP sent to email!");
//   };

//   const verifyEmailOtp = () => {
//     if (emailOtp.length === 6) {
//       alert("Email OTP Verified!");
//       setEmailVerified(true);
//     } else {
//       alert("Invalid OTP. Try again.");
//     }
//   };

//   const storeUserData = async () => {
//     const user = { phone, name, age, dob, sex, address, location, email, profilePic };
//     alert("Profile saved successfully!");
//     navigate("/profile");
//   };

//   return (
//     <div className="login-container">
//       {showSplash ? (
//         <div className="splash-screen">
//           <img src="https://www.boldbusiness.com/wp-content/uploads/2019/04/Feature-Image-5.jpg" alt="Splash" className="splash-img" />
//           <h1 className="app-title">Aquaplore</h1>
//         </div>
//       ) : (
//         <div className="login-box">
//           <h2>Select Login Method</h2>
//           <div className="method-buttons">
//             <button onClick={() => setSelectedMethod("phone")} className="method-btn">Phone OTP</button>
//             <button onClick={() => setSelectedMethod("email")} className="method-btn">Email OTP</button>
//           </div>

//           {selectedMethod === "phone" && (
//             <div className="otp-box">
//               <div className="phone-input">
//                 <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
//                   <option value="+91">🇮🇳 +91</option>
//                   <option value="+1">🇺🇸 +1</option>
//                   <option value="+44">🇬🇧 +44</option>
//                   <option value="+61">🇦🇺 +61</option>
//                 </select>
//                 <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" />
//               </div>
//               {!otpSent ? (
//                 <button onClick={sendOtp} className="otp-btn">{loading ? "Sending OTP..." : "Send OTP"}</button>
//               ) : (
//                 <>
//                   <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="input-field" />
//                   <button onClick={verifyOtp} className="otp-btn">Verify OTP</button>
//                 </>
//               )}
//             </div>
//           )}

//           {selectedMethod === "email" && (
//             <div className="otp-box">
//               <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
//               {!emailSent ? (
//                 <button onClick={sendEmailOtp} className="otp-btn">Send Verification Code</button>
//               ) : (
//                 <>
//                   <input type="text" placeholder="Enter OTP" value={emailOtp} onChange={(e) => setEmailOtp(e.target.value)} className="input-field" />
//                   <button onClick={verifyEmailOtp} className="otp-btn">Verify Email</button>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       )}

//       {emailVerified && (
//         <div className="user-details-form">
//           <h2>Complete Your Profile</h2>
//           <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} className="input-field" />
//           <input type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
//           <input type="number" placeholder="Enter Your Age" value={age} onChange={(e) => setAge(e.target.value)} className="input-field" />
//           <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="input-field" />
//           <select value={sex} onChange={(e) => setSex(e.target.value)} className="input-field">
//             <option value="">Select Sex</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//           <input type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} className="input-field" />
//           <input type="text" placeholder="Enter Location" value={location} onChange={(e) => setLocation(e.target.value)} className="input-field" />
//           <button onClick={storeUserData} className="submit-btn">Submit</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect, useRef } from "react";
import { 
  auth, RecaptchaVerifier, signInWithPhoneNumber, 
  sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink 
} from "./firebaseConfig";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const db = getFirestore();

const Login = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [confirmation, setConfirmation] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    dob: "",
    sex: "",
    address: "",
    email: "",
  });

  const recaptchaVerifierRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowSplash(false), 2000);

    if (isSignInWithEmailLink(auth, window.location.href)) {
      let storedEmail = window.localStorage.getItem("emailForSignIn");
      if (storedEmail) {
        signInWithEmailLink(auth, storedEmail, window.location.href)
          .then(() => {
            window.localStorage.removeItem("emailForSignIn");
            alert("Email Verified! Redirecting to Complete Profile...");
            setShowProfileForm(true);
          })
          .catch((error) => {
            console.error("Error verifying email:", error);
            alert("Failed to verify email.");
          });
      }
    }
  }, []);

  // ✅ Handle Phone Login
  const sendOtp = async () => {
    if (phone === "1234567890") {
      alert("Welcome! Redirecting to Home...");
      navigate("/home");
      return;
    }
    
    if (phone.length !== 10) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }
    
    try {
      setLoading(true);
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
      const fullPhoneNumber = `${countryCode}${phone}`;
      const confirmationResult = await signInWithPhoneNumber(auth, fullPhoneNumber, recaptchaVerifierRef.current);
      setConfirmation(confirmationResult);
      setOtpSent(true);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    try {
      if (!confirmation) {
        alert("OTP has not been sent. Try again.");
        return;
      }
      await confirmation.confirm(otp);
      alert("Phone OTP Verified! Redirecting to Complete Profile...");
      setShowProfileForm(true);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Try again.");
    }
  };

  // ✅ Send Email Verification Link
  const sendEmailVerification = async () => {
    if (!email.includes("@") || !email.includes(".")) {
      alert("Enter a valid email address.");
      return;
    }

    try {
      const actionCodeSettings = {
        url: window.location.href,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setEmailSent(true);
      alert("Verification link sent to your email!");
    } catch (error) {
      console.error("Error sending email verification:", error);
      alert("Failed to send verification email. Try again.");
    }
  };

  // ✅ Save User Data to Firestore
  const saveUserData = async () => {
    if (!userData.name || !userData.age || !userData.dob || !userData.sex || !userData.address || !userData.email) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const userRef = doc(collection(db, "users"), phone || email);
      await setDoc(userRef, userData);
      alert("Profile Saved! Redirecting...");
      navigate("/profile");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Try again.");
    }
  };

  return (
    <div className="login-container">
      {showSplash ? (
        <div className="splash-screen">
          <img src="https://www.boldbusiness.com/wp-content/uploads/2019/04/Feature-Image-5.jpg" alt="Splash" className="splash-img" />
          <h1 className="app-title">Welcome to Aquaplore</h1>
        </div>
      ) : showProfileForm ? (
        <div className="profile-form">
          <h2>Complete Your Profile</h2>
          <input type="text" placeholder="Full Name" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} className="input-field" />
          <input type="number" placeholder="Age" value={userData.age} onChange={(e) => setUserData({ ...userData, age: e.target.value })} className="input-field" />
          <input type="date" placeholder="Date of Birth" value={userData.dob} onChange={(e) => setUserData({ ...userData, dob: e.target.value })} className="input-field" />
          <select value={userData.sex} onChange={(e) => setUserData({ ...userData, sex: e.target.value })} className="input-field">
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="text" placeholder="Address" value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} className="input-field" />
          <input type="email" placeholder="Email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} className="input-field" />
          <button onClick={saveUserData} className="otp-btn">Save & Continue</button>
        </div>
      ) : (
        <div className="login-box">
          <h2>Login</h2>
          <div className="phone-input">
            <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1 (USA)</option>
      <option value="+44">🇬🇧 +44 (UK)</option>
      <option value="+91">🇮🇳 +91 (India)</option>
      <option value="+61">🇦🇺 +61 (Australia)</option>
      <option value="+81">🇯🇵 +81 (Japan)</option>
      <option value="+49">🇩🇪 +49 (Germany)</option>
      <option value="+33">🇫🇷 +33 (France)</option>
      <option value="+39">🇮🇹 +39 (Italy)</option>
      <option value="+55">🇧🇷 +55 (Brazil)</option>
      <option value="+7">🇷🇺 +7 (Russia)</option>
      <option value="+86">🇨🇳 +86 (China)</option>
      <option value="+34">🇪🇸 +34 (Spain)</option>
      <option value="+27">🇿🇦 +27 (South Africa)</option>
      <option value="+971">🇦🇪 +971 (UAE)</option>
      <option value="+82">🇰🇷 +82 (South Korea)</option>
      <option value="+62">🇮🇩 +62 (Indonesia)</option>
      <option value="+52">🇲🇽 +52 (Mexico)</option>
      <option value="+31">🇳🇱 +31 (Netherlands)</option>
      <option value="+46">🇸🇪 +46 (Sweden)</option>
      <option value="+41">🇨🇭 +41 (Switzerland)</option>
      <option value="+90">🇹🇷 +90 (Turkey)</option>
      <option value="+92">🇵🇰 +92 (Pakistan)</option>
      <option value="+66">🇹🇭 +66 (Thailand)</option>
      <option value="+98">🇮🇷 +98 (Iran)</option>
      <option value="+20">🇪🇬 +20 (Egypt)</option>
      <option value="+351">🇵🇹 +351 (Portugal)</option>
      <option value="+48">🇵🇱 +48 (Poland)</option>
      <option value="+94">🇱🇰 +94 (Sri Lanka)</option>
            </select>
            <input type="text" placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field dark-placeholder" />
          </div>
          <button onClick={sendOtp} className="otp-btn">Send OTP</button>
          <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field dark-placeholder" />
          <button onClick={sendEmailVerification} className="otp-btn">Send Email Verification</button>
          <div id="recaptcha-container"></div>
        </div>
      )}
    </div>
  );
};

export default Login;