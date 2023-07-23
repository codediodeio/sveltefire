import { writable } from "svelte/store";
import { getFirebaseContext } from "./sdk.js";
import { onAuthStateChanged } from "firebase/auth";

/**
 * @param  {any} startWith optional default data. Useful for server-side cookie-based auth
 * @returns a store with the current firebase user
 */
export function userStore(startWith = null) {
  let unsubscribe: () => void;

  const { auth } = getFirebaseContext();

  // Fallback for SSR
  if (!globalThis.window) {
    const { subscribe } = writable(startWith);
    return {
      subscribe,
    };
  }

  // Fallback for missing SDK
  if (!auth) {
    console.warn(
      "Firebase Auth is not initialized. Are you missing FirebaseApp as a parent component?"
    );
    const { subscribe } = writable(null);
    return {
      subscribe,
    };
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}
