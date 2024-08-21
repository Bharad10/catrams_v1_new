import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebase } from '@firebase/messaging';
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyDmzctUwIAlURfsavhPtafkcDc-EYZLSMg",
  authDomain: "rams-v2-34582.firebaseapp.com",
  projectId: "rams-v2-34582",
  storageBucket: "rams-v2-34582.appspot.com",
  messagingSenderId: "145063430644",
  appId: "1:145063430644:web:2e9e4b8c18aa07dfd551a1",
  measurementId: "G-96V7784J9F",
  vapidKey:'BFjftDhPHdakQM5ZHm6ufhAM5Ui3zaPYSYFAxdKp2QBQa-cksHditr8BakNqRT2-zU8s1R-hM1tL08p1Sg4HCyc'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const messaging = firebase.messaging();

// Add background message handler
messaging.onBackgroundMessage((payload) => {
  // Customize handling of background message
});

