<script lang="ts">
  import { configStore } from '$lib/stores/remote-config.js';
  import type { FirebaseApp } from 'firebase/app';
  
  import type { Value, RemoteConfig } from 'firebase/remote-config';
  import { onMount } from 'svelte';
  
  export let app: FirebaseApp;
  export let defaultValue = {};
  export let minimumFetchIntervalMillis = 3600000;

  let store;
  let remoteConfig: any;

  onMount(async () => {
    const firebaseRemoteConfig = await import('firebase/remote-config');

    remoteConfig = firebaseRemoteConfig.getRemoteConfig(app);
    store = configStore(remoteConfig!, defaultValue, minimumFetchIntervalMillis);
  })

  interface $$Slots {
    default: { values: Record<string, Value>; remoteConfig?: RemoteConfig },
    loading: {},
  }
  
</script>

{#if $store !== undefined}
  <slot values={$store} {remoteConfig} />
{:else}
  <slot name="loading" />
{/if}
