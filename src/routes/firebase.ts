import { initializeApp } from "firebase/app";
import {
  connectFirestoreEmulator,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import {
  connectDatabaseEmulator,
  getDatabase,
  ref as dbRef,
  set,
} from "firebase/database";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { dev } from "$app/environment";
import {
  connectStorageEmulator,
  getStorage,
  ref as storageRef,
  uploadString,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMHfJp1ec85QBo-mnke89qtiYGen9zTSE",
  authDomain: "sveltefire-testing.firebaseapp.com",
  databaseURL: "https://sveltefire-testing.firebaseio.com",
  projectId: "sveltefire-testing",
  storageBucket: "sveltefire-testing.appspot.com",
  messagingSenderId: "1030648105982",
  appId: "1:1030648105982:web:2afebc34841fa242ed4eaf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

if (dev || import.meta.env.MODE === "ci") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectDatabaseEmulator(rtdb, "localhost", 9000);
  connectStorageEmulator(storage, "localhost", 9199);

  // Seed Firestore
  setDoc(doc(db, "posts", "test"), {
    title: "Hi Mom",
    content: "this is a test",
  });

  // Seed Realtime Database
  set(dbRef(rtdb, "posts/test"), {
    title: "Hi Mom",
    content: "this is a test",
  });

  // Create a reference to the file to create
  const fileRef = storageRef(storage, "test.txt");

  // Upload a string to the file
  uploadString(fileRef, "Hello, world!", "raw")
    .then(() => {
      console.log("File created successfully!");
    })
    .catch((error) => {
      console.error("Error creating file:", error);
    });
}
