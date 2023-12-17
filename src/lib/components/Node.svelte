<script lang="ts">
  import { nodeStore } from "../stores/rtdb.js";
  import { getFirebaseContext } from "../stores/sdk.js";
  import type { DatabaseReference, Database } from "firebase/database";

  export let path: string;
  export let startWith: any = undefined;

  const { rtdb } = getFirebaseContext();
  let store = nodeStore(rtdb!, path, startWith);

  interface $$Slots {
    default: { data: any; ref: DatabaseReference | null; rtdb?: Database };
    loading: {};
  }
</script>

{#if $store !== undefined}
  <slot data={$store} ref={store.ref} {rtdb} />
{:else}
  <slot name="loading" />
{/if}
