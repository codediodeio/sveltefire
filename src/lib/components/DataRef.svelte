<script lang="ts">
  import { refStore } from "../stores/rtdb.js";
  import { getFirebaseContext } from "../stores/sdk.js";
  import type { DatabaseReference, Database } from "firebase/database";

  export let ref: string;
  export let startWith: any = undefined;

  const { rtdb } = getFirebaseContext();
  let store = refStore(rtdb!, ref, startWith);

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
