<script lang="ts">
  import type { DocumentReference, Firestore } from "firebase/firestore";
  import { docStore, sdk } from "./stores";

  type T = $$Generic<T>;

  interface $$Slots {
    default: {
      data: (T & { [key: string]: any }) | null;
      ref: DocumentReference | null;
    };
    loading: {};
  }

  export let ref: string | DocumentReference;
  export let firestore: Firestore = $sdk?.firestore;
  export let startWith: T | undefined = undefined;

  let store = docStore(firestore, ref, startWith);
</script>

{#if $store !== undefined}
  <slot data={$store} ref={store.ref} />
{:else}
  <slot name="loading" />
{/if}
