import { getAuth , GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "scart-5193b.firebaseapp.com",
  projectId: "scart-5193b",
  storageBucket: "scart-5193b.firebasestorage.app",
  messagingSenderId: "802974335041",
  appId: "1:802974335041:web:a5005b2f474c1c2f29c6c0",
  measurementId: "G-GSCT1PEGSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider =  new GoogleAuthProvider();

export {auth, provider};

