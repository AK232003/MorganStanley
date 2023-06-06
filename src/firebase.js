import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database"
import "firebase/compat/firestore";;

const firebaseConfig = {
    apiKey: "AIzaSyDLjy6zZ3_pe9w_fJdOaZF_hwcXm8Fh7Eg",
    authDomain: "food-pwa-4bc8e.firebaseapp.com",
    projectId: "food-pwa-4bc8e",
    storageBucket: "food-pwa-4bc8e.appspot.com",
    messagingSenderId: "340062742697",
    appId: "1:340062742697:web:62fd203102d28d890261b8"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const storage = app.storage();
export const database = app.database();
export const db = app.firestore();