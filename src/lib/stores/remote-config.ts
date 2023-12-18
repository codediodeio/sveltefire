import { readable } from "svelte/store";

import { fetchAndActivate, getBoolean, getNumber, getString, getValue, isSupported, type RemoteConfig } from "firebase/remote-config";


/**
 * @param  {RemoteConfig} remoteConfig firebase remoteConfig instance
 * @param  {any} defaultValue optional default data.
 * @returns a store with the fallback remote config value as an object
 */
function fallbacks(remoteConfig: RemoteConfig, defaultValue: any | undefined = undefined){
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
}

/**
 * @param  {RemoteConfig} remoteConfig firebase remoteConfig instance
 * @returns a store with the remote config activation status as a boolean
*/
export function remoteConfigActivationStore(remoteConfig: RemoteConfig) {

  const fallbackValue = fallbacks(remoteConfig, undefined);

  if(fallbackValue){
    return fallbackValue;
  }

  const { subscribe } = readable<boolean | undefined>(undefined, (set) => {
    isSupported().then(async (isSupported) => {
      if (isSupported) { 
        fetchAndActivate(remoteConfig).then(() => { set(true) });
      }
    });
  });

  return {
    subscribe,
  };
}

/**
 * @param  {RemoteConfig} remoteConfig firebase remoteConfig instance
 * @param  {string} configKey the key of the remote config value
 * @param  {any} defaultValue optional default data.
 * @returns a store with the requested remote config value as an object
 */
export function valueConfigStore(remoteConfig: RemoteConfig, configKey: string, defaultValue: any | undefined = undefined) {

  const fallbackValue = fallbacks(remoteConfig, defaultValue);

  if(fallbackValue){
    return fallbackValue;
  }

  const { subscribe } = readable(defaultValue, (set) => {
    set(getValue(remoteConfig, configKey));
  });

  return {
    subscribe,
  };
}

/**
 * @param  {RemoteConfig} remoteConfig firebase remoteConfig instance
 * @param  {string} configKey the key of the remote config value
 * @param  {boolean} defaultValue optional default data.
 * @returns a store with the requested remote config value as a boolean
 */
export function booleanConfigStore(remoteConfig: RemoteConfig, configKey: string, defaultValue: boolean | undefined = undefined) {

  const fallbackValue = fallbacks(remoteConfig, defaultValue);

  if(fallbackValue){
    return fallbackValue;
  }

  const { subscribe } = readable(defaultValue, (set) => {
      set(getBoolean(remoteConfig, configKey));
  });

  return {
    subscribe,
  };
}

/**
 * @param  {RemoteConfig} remoteConfig firebase remoteConfig instance
 * @param  {string} configKey the key of the remote config value
 * @param  {string | undefined} defaultValue optional default data.
 * @returns a store with the requested remote config value as a string
 */
export function stringConfigStore(remoteConfig: RemoteConfig, configKey: string, defaultValue: string | undefined = undefined) {

  const fallbackValue = fallbacks(remoteConfig, defaultValue);

  if(fallbackValue){
    return fallbackValue;
  }

  const { subscribe } = readable(defaultValue, (set) => {
    set(getString(remoteConfig, configKey));
  });

  return {
    subscribe,
  };
}

/**
 * @param  {RemoteConfig} remoteConfig firebase remoteConfig instance
 * @param  {string} configKey the key of the remote config value
 * @param  {number | undefined} defaultValue optional default data.
 * @returns a store with the requested remote config value as a number
 */
export function numberConfigStore(remoteConfig: RemoteConfig, configKey: string, defaultValue: number | undefined = undefined) {

  const fallbackValue = fallbacks(remoteConfig, defaultValue);

  if(fallbackValue){
    return fallbackValue;
  }

  const { subscribe } = readable(defaultValue, (set) => {
      set(getNumber(remoteConfig, configKey));
  });

  return {
    subscribe,
  };
}
