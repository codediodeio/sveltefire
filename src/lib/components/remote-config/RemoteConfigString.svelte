<script lang="ts">
  import type { RemoteConfig } from "firebase/remote-config";
  import { stringConfigStore } from "$lib/stores/remote-config.js";

  export let remoteConfig: RemoteConfig | undefined;
  export let variableName: string | undefined;

  let store;

  store = stringConfigStore(remoteConfig!, variableName!);

  interface $$Slots {
    default: { configValue: string | undefined; },
    loading: {},
  }
  
</script>

{#if $store !== undefined}
  <slot configValue={$store} />
{:else}
  <slot name="loading" />
{/if}
