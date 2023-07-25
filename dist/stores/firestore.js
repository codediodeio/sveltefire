import { writable } from "svelte/store";
import { doc, collection, onSnapshot } from "firebase/firestore";
/**
 * @param  {Firestore} firestore firebase firestore instance
 * @param  {string|DocumentReference} ref document path or reference
 * @param  {T} startWith optional default data
 * @returns a store with realtime updates on document data
 */
export function docStore(firestore, ref, startWith) {
    let unsubscribe;
    // Fallback for SSR
    if (!globalThis.window) {
        const { subscribe } = writable(startWith);
        return {
            subscribe,
            ref: null,
            id: "",
        };
    }
    // Fallback for missing SDK
    if (!firestore) {
        console.warn("Firestore is not initialized. Are you missing FirebaseApp as a parent component?");
        const { subscribe } = writable(null);
        return {
            subscribe,
            ref: null,
            id: "",
        };
    }
    const docRef = typeof ref === 'string' ? doc(firestore, ref) : ref;
    const { subscribe } = writable(startWith, (set) => {
        unsubscribe = onSnapshot(docRef, (snapshot) => {
            set(snapshot.data() ?? null);
        });
        return () => unsubscribe();
    });
    return {
        subscribe,
        ref: docRef,
        id: docRef.id,
    };
}
/**
 * @param  {Firestore} firestore firebase firestore instance
 * @param  {string|Query|CollectionReference} ref collection path, reference, or query
 * @param  {[]} startWith optional default data
 * @returns a store with realtime updates on collection data
 */
export function collectionStore(firestore, ref, startWith = []) {
    let unsubscribe;
    // Fallback for SSR
    if (!globalThis.window) {
        const { subscribe } = writable(startWith);
        return {
            subscribe,
            ref: null,
        };
    }
    // Fallback for missing SDK
    if (!firestore) {
        console.warn("Firestore is not initialized. Are you missing FirebaseApp as a parent component?");
        const { subscribe } = writable([]);
        return {
            subscribe,
            ref: null,
        };
    }
    const colRef = typeof ref === "string" ? collection(firestore, ref) : ref;
    const { subscribe } = writable(startWith, (set) => {
        unsubscribe = onSnapshot(colRef, (snapshot) => {
            const data = snapshot.docs.map((s) => {
                return { id: s.id, ref: s.ref, ...s.data() };
            });
            set(data);
        });
        return () => unsubscribe();
    });
    return {
        subscribe,
        ref: colRef,
    };
}
