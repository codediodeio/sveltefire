import { writable } from 'svelte/store';
import { assertApp } from './helpers';
import { startTrace, stopTrace } from './perf';

// Svelte Store for Storage file
export function fileStore(path, opts) {
  const storage = assertApp('storage');

  const { startWith, log, traceId, maxWait, once } = { maxWait: 10000, ...opts };

  const storageRef = storage.ref();
  const ref = typeof path === 'string' ? storageRef.child(path) : path;

  // Performance trace
  const trace = traceId && startTrace(traceId);

  // Internal state
  let _loading = typeof startWith !== undefined;
  let _error = null;
  let _teardown;
  let _waitForIt;

  // State should never change without emitting a new value
  // Clears loading state on first call
  const next = (val, err) => {
    _loading = false; 
    _waitForIt && clearTimeout(_waitForIt);
    _error = err || null;
    set(val);
    trace && stopTrace(trace);
  };

  // Timout
  // Runs of first subscription
  const start = () => {

    // Timout for fallback slot
    _waitForIt = maxWait && setTimeout(() => _loading && next(null, new Error(`Timeout at ${maxWait}. Using fallback slot.`) ), maxWait)

    // Realtime firebase subscription
    _teardown = ref.on("value",
      snapshot => {
        // Emit next value
        snapshot.getDownloadURL().then((url) => {
          next(url);
          if (log) console.log(`URl: ${url}`);
        });

        
        if (log) console.log('Snapshot:', snapshot);

        // Teardown after first emitted value if once
        once && _teardown();
      },

      // Handle firebase thrown errors
      error => {
        console.error(error);
        next(null, error);
      }
    );

    // Removes firebase listener when store completes
    return () => _teardown();
  };

  // Svelte store
  const store = writable(startWith, start);
  const { subscribe, set } = store;

  return {
    subscribe,
    firestore,
    ref,
    get loading() {
      return _loading;
    },
    get error() {
      return _error;
    }
  };
}

export function uploadFileStore(path, opts) {
  const storage = assertApp('storage');

  const { startWith, log, traceId } = { maxWait: 10000, ...opts };

  const storageRef = storage.ref();
  const ref = typeof path === 'string' ? storageRef.child(path) : path;
  let snapshot;
  let task;

  // Performance trace
  const trace = traceId && startTrace(traceId);

  // Internal state
  let _loading = typeof startWith !== undefined;
  let _error = null;
  let _waitForIt;

  // State should never change without emitting a new value
  // Clears loading state on first call
  const next = (val, err) => {
    _loading = false; 
    _waitForIt && clearTimeout(_waitForIt);
    _error = err || null;
    set(val);
    trace && stopTrace(trace);
  };

  // Timout
  // Runs of first subscription
  const start = () => {};

  // Svelte store
  const store = writable(startWith, start);
  let { subscribe, set } = store;

  const _set = set;
  set = (val) => {
    task = ref.put(val).then(snap => {
      snapshot = snap;
      ref.getDownloadURL().then((url) => {
        next(url);
        if (log) console.log(`URl: ${url}`);
      });
    });
    task.on('state_changed', snap => {
      snapshot = snap;
    });
  }

  return {
    subscribe,
    firestore,
    ref,
    get loading() {
      return _loading;
    },
    get error() {
      return _error;
    }
  };
}