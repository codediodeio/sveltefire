import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, doc, getFirestore, setDoc } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { dev } from "$app/environment";


const firebaseConfig = {
    apiKey: "AIzaSyAMHfJp1ec85QBo-mnke89qtiYGen9zTSE",
    authDomain: "sveltefire-testing.firebaseapp.com",
    databaseURL: "https://sveltefire-testing.firebaseio.com",
    projectId: "sveltefire-testing",
    storageBucket: "sveltefire-testing.appspot.com",
    messagingSenderId: "1030648105982",
    appId: "1:1030648105982:web:2afebc34841fa242ed4eaf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

if (dev) {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, "localhost", 8080);

    // Seed Firestore
    setDoc(doc(db, "posts", "test"), {
        title: "Hi Mom",
        content: "this is a test"
    });
}

