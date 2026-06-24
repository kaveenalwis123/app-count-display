import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCjCU7BCOfnInCZGV9DHamXDkYnaBa27M0",
  authDomain: "website-b000d.firebaseapp.com",
  databaseURL: "https://website-b000d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "website-b000d",
  storageBucket: "website-b000d.firebasestorage.app",
  messagingSenderId: "1066240126729",
  appId: "1:1066240126729:web:5c277d9ef5d7878a622dd8"
};

const app = initializeApp(firebaseConfig);

export const database =
getDatabase(app);