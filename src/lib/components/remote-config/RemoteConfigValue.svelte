<script lang="ts">
  import type { RemoteConfig } from "firebase/remote-config";
  import { valueConfigStore } from "$lib/stores/remote-config.js";

  export let remoteConfig: RemoteConfig | undefined;
  export let variableName: string | undefined;

  let store = valueConfigStore(remoteConfig!, variableName!);

  interface $$Slots {
    default: { configValue: any | undefined; },
    loading: {},
  }
  
</script>

{#if $store !== undefined}
  <slot configValue={$store} />
{:else}
  <slot name="loading" />
{/if}
