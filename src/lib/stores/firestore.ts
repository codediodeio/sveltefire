import { writable } from "svelte/store";
import { doc, collection, onSnapshot } from "firebase/firestore";
import type { Query, CollectionReference, DocumentReference, Firestore } from "firebase/firestore";

interface DocStore<T> {
  subscribe: (cb: (value: T | null) => void) => void | (() => void);
  ref: DocumentReference<T> | null;
  id: string;
}

/**
 * @param  {Firestore} firestore firebase firestore instance
 * @param  {string|DocumentReference} ref document path or reference
 * @param  {T} startWith optional default data
 * @returns a store with realtime updates on document data
 */
export function docStore<T = any>(
  firestore: Firestore,
  ref: string | DocumentReference<T>,
  startWith?: T
): DocStore<T> {
  let unsubscribe: () => void;

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
    console.warn(
      "Firestore is not initialized. Are you missing FirebaseApp as a parent component?"
    );
    const { subscribe } = writable(null);
    return {
      subscribe,
      ref: null,
      id: "",
    };
  }

  const docRef = typeof ref === "string" ? (doc(firestore, ref) as DocumentReference<T>) : ref;

  const { subscribe } = writable<T | null>(startWith, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}

interface CollectionStore<T> {
  subscribe: (cb: (value: T | []) => void) => void | (() => void);
  ref: CollectionReference<T> | Query<T> | null;
}

/**
 * @param  {Firestore} firestore firebase firestore instance
 * @param  {string|Query|CollectionReference} ref collection path, reference, or query
 * @param  {[]} startWith optional default data
 * @returns a store with realtime updates on collection data
 */
export function collectionStore<T>(
  firestore: Firestore,
  ref: string | Query<T> | CollectionReference<T>,
  startWith: T[] = []
): CollectionStore<T[]> {
  let unsubscribe: () => void;

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
    console.warn(
      "Firestore is not initialized. Are you missing FirebaseApp as a parent component?"
    );
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
        return { id: s.id, ref: s.ref, ...s.data() } as T;
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
