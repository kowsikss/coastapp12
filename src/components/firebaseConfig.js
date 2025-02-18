import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARLTL68VVFlyyDbXYyxAAX3t9RIR_TgX8",
  authDomain: "aquaplore-83943.firebaseapp.com",
  projectId: "aquaplore-83943",
  storageBucket: "aquaplore-83943.firebasestorage.app",
  messagingSenderId: "447939322891",
  appId: "1:447939322891:web:95598394b10993a5bcd30e",
  measurementId: "G-1TS04CZ7QK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
