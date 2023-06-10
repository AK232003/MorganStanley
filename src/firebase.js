// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";
import "firebase/compat/firestore";
import "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = firebase.initializeApp({
  apiKey: "AIzaSyDE4JJC2PYUpNJ4B5iHlxSYtTTmYXS85Lc",
  authDomain: "balasha-bf560.firebaseapp.com",
  projectId: "balasha-bf560",
  storageBucket: "balasha-bf560.appspot.com",
  messagingSenderId: "725098737426",
  appId: "1:725098737426:web:062010579d70d59e228dcb"
});

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const storage = app.storage();
export const database = app.database();
const db1 = firebase.firestore();
db1.enablePersistence().catch((e) => {
  console.log(e)
});
export const db = db1;