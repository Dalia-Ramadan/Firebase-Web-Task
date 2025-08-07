import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA93kVh7sMll9Maa_XYECxeGcHz0GRr0qc",
  authDomain: "e-commerce-e2f05.firebaseapp.com",
  projectId: "e-commerce-e2f05",
  storageBucket: "e-commerce-e2f05.firebasestorage.app",
  messagingSenderId: "334961205187",
  appId: "1:334961205187:web:053d55644480f4fac3a776",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let auth = getAuth(app);
let db = getFirestore(app);
export { auth , db};
