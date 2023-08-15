import { readable } from "svelte/store";
import {
  getDownloadURL,
  list,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import type {
  StorageReference,
  FirebaseStorage,
  ListResult,
  UploadTaskSnapshot,
  UploadMetadata,
} from "firebase/storage";

const defaultListResult: ListResult = {
  prefixes: [],
  items: [],
};

interface StorageListStore {
  subscribe: (cb: (value: ListResult) => void) => void | (() => void);
  reference: StorageReference | null;
}

/**
 * @param  {FirebaseStorage} storage firebase storage instance
 * @param  {string|StorageReference} reference file or storage item path or reference
 * @param  {{prefixes:[], items:[]}} startWith optional default data
 * @returns a store with the list result
 */
export function storageListStore(
  storage: FirebaseStorage,
  reference: string | StorageReference,
  startWith: ListResult = defaultListResult
): StorageListStore {
  // Fallback for SSR
  if (!globalThis.window) {
    const { subscribe } = readable(startWith);
    return {
      subscribe,
      reference: null,
    };
  }

  // Fallback for missing SDK
  if (!storage) {
    console.warn(
      "Cloud Storage is not initialized. Are you missing FirebaseApp as a parent component?"
    );
    const { subscribe } = readable(defaultListResult);
    return {
      subscribe,
      reference: null,
    };
  }

  const storageRef =
    typeof reference === "string" ? ref(storage, reference) : reference;

  const { subscribe } = readable(startWith, (set) => {
    list(storageRef).then((snapshot) => {
      set(snapshot);
    });
  });

  return {
    subscribe,
    reference: storageRef,
  };
}

interface DownloadUrlStore {
  subscribe: (cb: (value: string | null) => void) => void | (() => void);
  reference: StorageReference | null;
}

/**
 * @param  {FirebaseStorage} storage firebase storage instance
 * @param  {string|StorageReference} reference file or storage item path or reference
 * @param  {null} startWith optional default data
 * @returns a store with the list result
 */
export function downloadUrlStore(
  storage: FirebaseStorage,
  reference: string | StorageReference,
  startWith: string | null = null
): DownloadUrlStore {
  // Fallback for SSR
  if (!globalThis.window) {
    const { subscribe } = readable(startWith);
    return {
      subscribe,
      reference: null,
    };
  }

  // Fallback for missing SDK
  if (!storage) {
    console.warn(
      "Cloud Storage is not initialized. Are you missing FirebaseApp as a parent component?"
    );
    const { subscribe } = readable(null);
    return {
      subscribe,
      reference: null,
    };
  }

  const storageRef =
    typeof reference === "string" ? ref(storage, reference) : reference;

  const { subscribe } = readable(startWith, (set) => {
    getDownloadURL(storageRef).then((snapshot) => {
      set(snapshot);
    });
  });

  return {
    subscribe,
    reference: storageRef,
  };
}

interface UploadTaskStore {
  subscribe: (
    cb: (value: UploadTaskSnapshot | null) => void
  ) => void | (() => void);
  reference: StorageReference | null;
}

export function uploadTaskStore(
  storage: FirebaseStorage,
  reference: string | StorageReference,
  data: Blob | Uint8Array | ArrayBuffer,
  metadata?: UploadMetadata | undefined
): UploadTaskStore {
  // Fallback for SSR
  if (!globalThis.window) {
    const { subscribe } = readable(null);
    return {
      subscribe,
      reference: null,
    };
  }

  // Fallback for missing SDK
  if (!storage) {
    console.warn(
      "Cloud Storage is not initialized. Are you missing FirebaseApp as a parent component?"
    );
    const { subscribe } = readable(null);
    return {
      subscribe,
      reference: null,
    };
  }

  const storageRef =
    typeof reference === "string" ? ref(storage, reference) : reference;

  let unsubscribe: () => void;

  const { subscribe } = readable<UploadTaskSnapshot | null>(null, (set) => {
    const task = uploadBytesResumable(storageRef, data, metadata);
    unsubscribe = task.on(
      "state_changed",
      (snapshot) => {
        set(snapshot);
      },
      (error) => {
        console.error(error);
        set(task.snapshot);
      },
      () => {
        set(task.snapshot);
      }
    );
    return () => unsubscribe();
  });

  return {
    subscribe,
    reference: storageRef,
  };
}
