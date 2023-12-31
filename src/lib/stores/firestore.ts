import { readable } from "svelte/store";
import { doc, collection, onSnapshot } from "firebase/firestore";
import type {
  Query,
  CollectionReference,
  DocumentReference,
  Firestore,
  DocumentData,
} from "firebase/firestore";
import type { FirebaseError } from "firebase/app";

type DocValue<T> = {
  data: T | null | undefined;
  error: Error | null;
};

interface DocStore<T> {
  subscribe: (cb: (value: DocValue<T>) => void) => void | (() => void);
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
    const { subscribe } = readable({data: startWith, error: null});
    return {
      subscribe,
      ref: null,
      id: "",
    };
  }

  // Fallback for missing SDK
  if (!firestore) {
    const { subscribe } = readable({data: null, error: new Error("Firestore is not initialized. Are you missing FirebaseApp as a parent component?")});
    return {
      subscribe,
      ref: null,
      id: "",
    };
  }

  let docRef: DocumentReference<T>;
  
  try {
    docRef = typeof ref === "string" ? (doc(firestore, ref) as DocumentReference<T>) : ref;
  } catch (error) {
    const { subscribe } = readable({data: null, error: new Error(`Failed to create DocumentReference from path "${ref}" : ${error}`)});
    return {
      subscribe,
      ref: null,
      id: "",
    };
  }

  const { subscribe } = readable<DocValue<T>>({data: startWith, error: null}, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set({data: (snapshot.data() as T) ?? null, error: null});
    }, (error: FirebaseError) => {
      set({data: null, error});
    });
    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}

type CollectionValue<T> = {
  data: T | [];
  error: Error | null;
};

interface CollectionStore<T> {
  subscribe: (cb: (value: CollectionValue<T>) => void) => void | (() => void);
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
    const { subscribe } = readable({data: startWith, error: null});
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
    const { subscribe } = readable({data: [], error: new Error("Firestore is not initialized. Are you missing FirebaseApp as a parent component?")});
    return {
      subscribe,
      ref: null,
    };
  }

  let colRef: CollectionReference<DocumentData> | Query<T>;

  try {
    colRef = typeof ref === "string" ? collection(firestore, ref) : ref;
  } catch (error) {
    const { subscribe } = readable({data: [], error: new Error(`Failed to create DocumentReference from path "${ref}" : ${error}`)});
    return {
      subscribe,
      ref: null,
    };
  }

  const { subscribe } = readable<CollectionValue<T[]>>({data: startWith, error: null}, (set) => {
    unsubscribe = onSnapshot(colRef, (snapshot): void => {
      const data = snapshot.docs.map((s: DocumentData) => {
        return { id: s.id, ref: s.ref, ...s.data() } as T;
      });
      set({data, error: null});
    },
    (error: FirebaseError) => {
      set({data: [], error});
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: colRef,
  };
}
