import { writable } from "svelte/store";
import { onValue, ref as dbRef } from "firebase/database";
import type { Database } from "firebase/database";

/**
 * @param {Database} rtdb - Firebase Realtime Database instance.
 * @param {string} ref - Database path or reference.
 * @param {T | undefined} startWith - Optional default data.
 * @returns a store with realtime updates on individual database reference data.
 */
export function refStore<T = any>(rtdb: Database, ref: string, startWith?: T) {
  const dataRef = dbRef(rtdb, ref);

  const { subscribe } = writable<T | null>(startWith, (set) => {
    const unsubscribe = onValue(dataRef, (snapshot) => {
      set(snapshot.val() as T);
    });

    return unsubscribe;
  });

  return {
    subscribe,
    ref: dataRef,
  };
}

/**
 * @param {Database} rtdb - Firebase Realtime Database instance.
 * @param {string} ref - Database path or reference.
 * @param {T[]} startWith - Optional default data.
 * @returns a store with realtime updates on lists of data.
 */
export function listStore<T = any>(
  rtdb: Database,
  ref: string,
  startWith: T[] = []
) {
  const listRef = dbRef(rtdb, ref);

  const { subscribe } = writable<T[]>(startWith, (set) => {
    const unsubscribe = onValue(listRef, (snapshot) => {
      const dataArr: T[] = [];
      snapshot.forEach((childSnapshot) => {
        dataArr.push({
          ref: childSnapshot.ref,
          ...childSnapshot.val(),
        } as T);
      });
      set(dataArr);
    });

    return unsubscribe;
  });

  return {
    subscribe,
    ref: listRef,
  };
}
