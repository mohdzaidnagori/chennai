
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzv6vHfpH8Jdc5On5rFD01TPekYlZsf5Y",
  authDomain: "chennai-dashboard.firebaseapp.com",
  projectId: "chennai-dashboard",
  storageBucket: "chennai-dashboard.appspot.com",
  messagingSenderId: "65081499111",
  appId: "1:65081499111:web:4dbc8f4bc2f49127b87142"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();