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
import { error } from "@sveltejs/kit";

const defaultListResult: ListResult = {
  prefixes: [],
  items: [],
};

type StorageListValue = {
  data: ListResult | null | undefined;
  error: Error | null;
};

interface StorageListStore {
  subscribe: (cb: (value: StorageListValue) => void) => void | (() => void);
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
    const { subscribe } = readable({ data: startWith, error: null });
    return {
      subscribe,
      reference: null,
    };
  }

  // Fallback for missing SDK
  if (!storage) {
    console.error("Cloud Storage is not initialized. Are you missing FirebaseApp as a parent component?");
    const { subscribe } = readable({data: null, error: new Error("Cloud Storage is not initialized. Are you missing FirebaseApp as a parent component?")});
    return {
      subscribe,
      reference: null,
    };
  }

  let storageRef: StorageReference;
  
  try{
    storageRef = typeof reference === "string" ? ref(storage, reference) : reference;
  } 
  catch(error) {
    console.error(`Failed to create StorageReference from path "${reference}" : ${error}`);
    const { subscribe } = readable({data: null, error: new Error(`Failed to create StorageReference from path "${reference}" : ${error}`)});
    return {
      subscribe,
      reference: null,
    };
  }

  const { subscribe } = readable<StorageListValue>({data: startWith, error: null}, (set) => {
    list(storageRef).then((snapshot) => {
      set({data: snapshot, error: null});
    },
    (error) => {
      set({data: null, error});
    });
  });

  return {
    subscribe,
    reference: storageRef,
  };
}

type DownloadUrlValue = {
  data: string | null;
  error: Error | null;
}
interface DownloadUrlStore {
  subscribe: (cb: (value: DownloadUrlValue) => void) => void | (() => void);
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
    const { subscribe } = readable({data: startWith, error: null});
    return {
      subscribe,
      reference: null,
    };
  }

  // Fallback for missing SDK
  if (!storage) {
    console.error(
      "Cloud Storage is not initialized. Are you missing FirebaseApp as a parent component?"
    );
    const { subscribe } = readable({data: null, error: new Error("Cloud Storage is not initialized. Are you missing FirebaseApp as a parent component?")});
    return {
      subscribe,
      reference: null,
    };
  }

  let storageRef: StorageReference;
  
  try{
    storageRef = typeof reference === "string" ? ref(storage, reference) : reference;
  }
  catch(error) {
    console.error(`Failed to create StorageReference from path "${reference}" : ${error}`);
    const { subscribe } = readable({data: null, error: new Error(`Failed to create StorageReference from path "${reference}" : ${error}`)});
    return {
      subscribe,
      reference: null,
    };
  }

  const { subscribe } = readable<DownloadUrlValue>({data: startWith, error: null}, (set) => {
    getDownloadURL(storageRef).then((snapshot) => {
      set({data: snapshot, error: null});
    },
    (error) => {
      set({data: null, error});
    });
  });

  return {
    subscribe,
    reference: storageRef,
  };
}

type UploadTaskValue = {
  data: UploadTaskSnapshot | null;
  error: Error | null;
}

interface UploadTaskStore {
  subscribe: (
    cb: (value: UploadTaskValue) => void
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
    const { subscribe } = readable({data: null, error: null});
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
    const { subscribe } = readable({data: null, error: new Error("Cloud Storage is not initialized. Are you missing FirebaseApp as a parent component?")});
    return {
      subscribe,
      reference: null,
    };
  }

  let storageRef: StorageReference;
  
  try{
    storageRef = typeof reference === "string" ? ref(storage, reference) : reference;
  } 
  catch(error) {
    console.error(`Failed to create StorageReference from path "${reference}" : ${error}`);
    const { subscribe } = readable({data: null, error: new Error(`Failed to create StorageReference from path "${reference}" : ${error}`)});
    return {
      subscribe,
      reference: null,
    };
  }

  let unsubscribe: () => void;

  const { subscribe } = readable<UploadTaskValue>({data: null, error: null}, (set) => {
    const task = uploadBytesResumable(storageRef, data, metadata);
    unsubscribe = task.on(
      "state_changed",
      (snapshot) => {
        set({data: snapshot, error: null});
      },
      (error) => {
        console.error(error);
        set({data: task.snapshot, error});
      },
      () => {
        set({data: task.snapshot, error: null});
      }
    );
    return () => unsubscribe();
  });

  return {
    subscribe,
    reference: storageRef,
  };
}
