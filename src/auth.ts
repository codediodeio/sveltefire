import { writable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { getFirebaseContext } from './helpers';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { User, Auth } from "firebase/auth";

export type UserStoreOpts = {
  persist: Storage;
}

export type UserDataStore = Readable<User> & {
  auth: Auth;
};


export function userStore(opts :UserStoreOpts = { persist: null }) :UserDataStore {

    const app = getFirebaseContext();
    const auth = getAuth(app);

    const storageKey = 'sveltefire_user';
    let cached = null;
  
    const { persist } = opts;
  
    if (persist) {
      cached = JSON.parse(persist.getItem(storageKey));
    }
  
    const store = writable<User>(cached, () => {
      const teardown = onAuthStateChanged(auth, u => {
        set(u);
        persist && persist.setItem(storageKey, JSON.stringify(u));
      });
      return () => teardown;
    });
  
    const { subscribe, set } = store;
  
    return {
      subscribe,
      auth
    };
  }
  