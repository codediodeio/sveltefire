import { writable } from 'svelte/store';
import { assertApp } from './helpers';


export function remoteConfigStore(opts = { default: {} }) {

    const remoteConfig = assertApp('remoteConfig')();

    remoteConfig.defaultConfig = opts.default;
  
    const store = writable(opts.default, () => {
      remoteConfig.fetchAndActivate()
        .then(() => {
          set(remoteConfig.getAll());
        })
        .catch((err) => {
          console.error("[Sveltefire: Remote Config]", err);
        });

    });
  
    const { subscribe, set } = store;
  
    return {
      subscribe,
      remoteConfig
    };
  }
  