import { writable } from "svelte/store";
import type { Firestore } from "firebase/firestore";
import type { Auth } from "firebase/auth";
import { getContext, setContext } from "svelte";


export interface FirebaseSDKContext {
  auth?: Auth;
  firestore?: Firestore;
}

export const contextKey = "firebase";

export function setFirebaseContext(sdks: FirebaseSDKContext) {
  setContext(contextKey, sdks);
}

/**
 * Get the Firebase SDKs from Svelte context
 */
export function getFirebaseContext(): FirebaseSDKContext {
  return getContext(contextKey);
}
