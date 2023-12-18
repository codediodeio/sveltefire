<script lang="ts">
  import { getFirebaseContext } from '$lib/stores/sdk.js';
  import type { RemoteConfig } from 'firebase/remote-config';
  import { getRemoteConfig } from 'firebase/remote-config';
  import { remoteConfigActivationStore } from '$lib/stores/remote-config.js';
  import { onMount } from 'svelte';
  
  export let defaultValue = {};
  export let minimumFetchIntervalMillis = 3600000;

  let configActivated;
  let remoteConfig: RemoteConfig | undefined;

  const { app } = getFirebaseContext();

  // Initialize remote config instance with default values and minimum fetch interval
  // The instance will be created when the component is mounted because Remote Config
  // requires the code to run in the browser
  onMount(() => {

    remoteConfig = getRemoteConfig(app);
    remoteConfig.settings.minimumFetchIntervalMillis = minimumFetchIntervalMillis;
    remoteConfig.defaultConfig = defaultValue;

    configActivated = remoteConfigActivationStore(remoteConfig);

  });

  interface $$Slots {
    default: { remoteConfig?: RemoteConfig },
    loading: {},
  }
</script>

{#if remoteConfig !== undefined && $configActivated === true}
  <slot {remoteConfig} />
{:else}
  <slot name="loading" />
{/if}
