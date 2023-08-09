<script lang="ts">
  import { getFirebaseContext } from '../stores/sdk.js';
  import { configStore } from '$lib/stores/remote-config.js';
  
  import type { Value, RemoteConfig } from 'firebase/remote-config';

  export let defaultValue = {};
  export let minimumFetchIntervalMillis = 3600000;

  const { remoteConfig } = getFirebaseContext();

  let store = configStore(remoteConfig!, defaultValue, minimumFetchIntervalMillis);

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
