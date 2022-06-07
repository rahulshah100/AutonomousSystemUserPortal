// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQaHHxTgeFcKZfGl5j7J7cJP8gnBkE38A",
    authDomain: "autonomousvehicle-85c40.firebaseapp.com",
    databaseURL: "https://autonomousvehicle-85c40-default-rtdb.firebaseio.com",
    projectId: "autonomousvehicle-85c40",
    storageBucket: "autonomousvehicle-85c40.appspot.com",
    messagingSenderId: "210830048668",
    appId: "1:210830048668:web:6bba87367d610b7e0b9c59",
    measurementId: "G-GLGQT70T02"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);