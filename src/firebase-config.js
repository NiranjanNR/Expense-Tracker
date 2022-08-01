import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCQfLuYkbeSXQ321FbspTtSCSxFx7nGiKU",
    authDomain: "expense-tracker-19f1d.firebaseapp.com",
    projectId: "expense-tracker-19f1d",
    storageBucket: "expense-tracker-19f1d.appspot.com",
    messagingSenderId: "103193181447",
    appId: "1:103193181447:web:b73f92e01f3c2b751f99a2",
    measurementId: "G-FCXNQD325C"
  };
  
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
