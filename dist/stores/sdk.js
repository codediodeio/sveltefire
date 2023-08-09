import { getContext, setContext } from "svelte";
export const contextKey = "firebase";
export function setFirebaseContext(sdks) {
    setContext(contextKey, sdks);
}
/**
 * Get the Firebase SDKs from Svelte context
 */
export function getFirebaseContext() {
    return getContext(contextKey);
}
