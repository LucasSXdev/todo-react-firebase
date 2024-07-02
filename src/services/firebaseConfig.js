import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIvI-GlbmwwGY08VLZtnXYatTvVw4gmv8",
  authDomain: "curso-ba8aa.firebaseapp.com",
  projectId: "curso-ba8aa",
  storageBucket: "curso-ba8aa.appspot.com",
  messagingSenderId: "531044279848",
  appId: "1:531044279848:web:966d873d0224dda9f4f71d",
  measurementId: "G-MYWNZN269X"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

export{db,auth}