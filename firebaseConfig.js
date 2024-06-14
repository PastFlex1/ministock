// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASJD7Isxe0jiMlqHMwefcrTgKam3a9Wuo",
  authDomain: "react-gradostock.firebaseapp.com",
  projectId: "react-gradostock",
  storageBucket: "react-gradostock.appspot.com",
  messagingSenderId: "1050393830058",
  appId: "1:1050393830058:web:6f683bf2403d78fd1326d3"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase