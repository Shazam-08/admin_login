import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBBfA9k0uW3z2Np3QHUg1Aj8hKLP23io1w",
  authDomain: "chargeit-2fa23.firebaseapp.com",
  projectId: "chargeit-2fa23",
  storageBucket: "chargeit-2fa23.appspot.com",
  messagingSenderId: "1012019747956",
  appId: "1:1012019747956:web:ee9def1ab9a82ea33b4521",
  measurementId: "G-Y24G8CSF49",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
