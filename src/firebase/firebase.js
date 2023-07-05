import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const firebaseConfig = {
    apiKey: "AIzaSyDQs0j3azMcP7bPUDATjgOU_3Op8qftDpo",
    authDomain: "todo-app-ba6c3.firebaseapp.com",
    projectId: "todo-app-ba6c3",
    storageBucket: "todo-app-ba6c3.appspot.com",
    messagingSenderId: "497253296459",
    appId: "1:497253296459:web:227b78e748ad2e9564a0ce",
    measurementId: "G-PJPWEN2RJQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

const ui = new firebaseui.auth.AuthUI(auth);

export { app, ui, analytics, db, auth };
export default firebase;
