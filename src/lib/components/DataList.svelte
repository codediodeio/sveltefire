<script lang="ts">
  import { listStore } from "../stores/rtdb.js";
  import { getFirebaseContext } from "../stores/sdk.js";
  import type { DatabaseReference, Database } from "firebase/database";

  export let ref: string;
  export let startWith: any[] = [];

  const { rtdb } = getFirebaseContext();
  let store = listStore(rtdb!, ref, startWith);

  interface $$Slots {
    default: {
      data: any[];
      ref: DatabaseReference | null;
      count: number;
      rtdb?: Database;
    };
    loading: {};
  }
</script>

{#if $store !== undefined}
  <slot data={$store} ref={store.ref} count={$store?.length ?? 0} {rtdb} />
{:else}
  <slot name="loading" />
{/if}
