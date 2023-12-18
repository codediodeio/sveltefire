<script lang="ts">
  import { numberConfigStore } from "$lib/stores/remote-config.js";
  import type { RemoteConfig } from "firebase/remote-config";

  export let remoteConfig: RemoteConfig | undefined;
  export let variableName: string | undefined;

  let store;

  store = numberConfigStore(remoteConfig!, variableName!);

  interface $$Slots {
    default: { configValue: number | undefined; },
    loading: {},
  }
  
</script>

{#if $store !== undefined}
  <slot configValue={$store} />
{:else}
  <slot name="loading" />
{/if}
