import { writable } from 'svelte/store';
import { assertApp } from './helpers';


export function userStore(opts = { persist: null }) {

    const auth = assertApp('auth');
    const k = 'sveltefire_user';
    let cached = null;
  
    const { persist } = opts;
  
    if (persist) {
      cached = JSON.parse(opts.persist.getItem(k));
    }
  
    const store = writable(cached, () => {
      const teardown = auth.onAuthStateChanged(u => {
        set(u);
        persist && opts.persist.setItem(k, JSON.stringify(u));
      });
      return () => teardown;
    });
  
    const { subscribe, set } = store;
  
    return {
      subscribe,
      auth
    };
  }
  