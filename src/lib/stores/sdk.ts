import type { Firestore } from "firebase/firestore";
import type { Database } from "firebase/database";
import type { Auth } from "firebase/auth";
import { getContext, setContext } from "svelte";
import type { FirebaseStorage } from "firebase/storage";
import type { Analytics } from "firebase/analytics";

export interface FirebaseSDKContext {
  auth?: Auth;
  firestore?: Firestore;
  rtdb?: Database;
  storage?: FirebaseStorage;
  analytics?: Analytics | null;
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
