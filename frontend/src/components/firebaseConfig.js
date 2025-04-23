import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink  } from "firebase/auth";
import { getDatabase } from "firebase/database";
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
const database = getDatabase(app);
auth.useDeviceLanguage();

export { auth, RecaptchaVerifier, signInWithPhoneNumber, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink };
export{ database};

// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };

// console.log("Firebase API Key:", process.env.REACT_APP_FIREBASE_API_KEY);


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// auth.useDeviceLanguage();

// export { auth, RecaptchaVerifier, signInWithPhoneNumber };
