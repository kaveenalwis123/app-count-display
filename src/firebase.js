import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-R4hXZ6j4C0fER8_zj7hylz09d7BhRtc",
  authDomain: "shelf-project-57341.firebaseapp.com",
  projectId: "shelf-project-57341",
  storageBucket: "shelf-project-57341.firebasestorage.app",
  messagingSenderId: "1053400798336",
  appId: "1:1053400798336:web:3d8bd7a552f38c70ae8265",
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const platformSensorsRef = doc(db, "test_collection", "test_doc");
export const PLATFORM_FIELD = "platform conditions";