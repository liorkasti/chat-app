// @refresh state
import 'firebase/auth';
import 'firebase/firestore';
import firebase from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyCfmmo2ZapbXKxdbbx4xRVN5YZMHo-ehZY",
    authDomain: "chat-app-34d87.firebaseapp.com",
    projectId: "chat-app-34d87",
    storageBucket: "chat-app-34d87.appspot.com",
    messagingSenderId: "380142425991",
    appId: "1:380142425991:web:bd3f87b9f7fb991f5de522"
};

let app;
if (firebase.apps.length === 0) {
    // Initialize Firebase
    app = firebase.initializeApp(firebaseConfig);
} else {
    app.firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth }
