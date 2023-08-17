import { readable } from "svelte/store";

import { fetchAndActivate, getAll, isSupported, type RemoteConfig } from "firebase/remote-config";

/**
 * @param  {RemoteConfig} remoteConfig firebase remoteConfig instance
 * @param  {any} defaultValue optional default data.
 * @returns a store with all remote config values
 */
export function configStore(remoteConfig: RemoteConfig, defaultValue: any = {}, minimumFetchIntervalMillis: number = 3600000) {

  // Fallback for SSR
  if (!globalThis.window) {
    const { subscribe } = readable(defaultValue);
    return {
      subscribe,
    };
  }

  // Fallback for missing SDK
  if (!remoteConfig) {
    console.warn(
      "Firebase RemoteConfig is not initialized. Are you missing FirebaseApp as a parent component?"
    );
    const { subscribe } = readable(null);
    return {
      subscribe,
    };
  }

  remoteConfig.settings.minimumFetchIntervalMillis = minimumFetchIntervalMillis;
  remoteConfig.defaultConfig = defaultValue;

  const { subscribe } = readable(defaultValue, (set) => {
    isSupported().then((isSupported) => {
      if (isSupported) {
        fetchAndActivate(remoteConfig).then(() => {
          set(getAll(remoteConfig));
        }).catch((err) => {
          console.error(err);
        });
      }
    })
  });

  return {
    subscribe,
  };
}
