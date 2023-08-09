import type { Firestore } from "firebase/firestore";
import type { Database } from "firebase/database";
import type { Auth } from "firebase/auth";
export interface FirebaseSDKContext {
    auth?: Auth;
    firestore?: Firestore;
    rtdb?: Database;
}
export declare const contextKey = "firebase";
export declare function setFirebaseContext(sdks: FirebaseSDKContext): void;
/**
 * Get the Firebase SDKs from Svelte context
 */
export declare function getFirebaseContext(): FirebaseSDKContext;
