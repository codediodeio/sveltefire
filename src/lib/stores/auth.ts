import { readable, writable } from "svelte/store";
import { onAuthStateChanged, type Auth, type User } from "firebase/auth";

/**
 * @param  {Auth} auth firebase auth instance
 * @param  {any} startWith optional default data. Useful for server-side cookie-based auth
 * @returns a store with the current firebase user
 * user != null -> signed in
 * user == null -> signed out
 * user == undefined -> still loading auth status on initial page load -> show loading spinner or sth else to prevent a normally signed in user from seeing content as a signed out user for a second
 */
export function userStore(auth: Auth, startWith = undefined) {
  let unsubscribe: () => void;

  // Fallback for SSR
  if (!globalThis.window) {
    const { subscribe } = readable(startWith);
    return {
      subscribe,
    };
  }

  // Fallback for missing SDK
  if (!auth) {
    console.warn(
      "Firebase Auth is not initialized. Are you missing FirebaseApp as a parent component?"
    );
    const { subscribe } = readable(undefined);
    return {
      subscribe,
    };
  }

  const { subscribe } = readable<User | null | undefined>(
    auth.currentUser ?? undefined,
    (set) => {
      const unsubscribe = onAuthStateChanged(auth, set);
      return () => unsubscribe();
    }
  );

  return {
    subscribe,
  };
}
