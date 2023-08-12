<script lang="ts" generics="Data extends DocumentData">
  import type {
    DocumentData,
    DocumentReference,
    Firestore,
  } from "firebase/firestore";
  import { docStore } from "../stores/firestore.js";
  import { getFirebaseContext } from "../stores/sdk.js";

  export let ref: string | DocumentReference<Data>;
  export let startWith: Data | undefined = undefined;

  const { firestore } = getFirebaseContext();

  let store = docStore(firestore!, ref, startWith);

  interface $$Slots {
    default: {
      data: Data;
      ref: DocumentReference<Data> | null;
      firestore?: Firestore;
    };
    loading: {};
  }
</script>

{#if $store !== undefined && $store !== null}
  <slot data={$store} ref={store.ref} {firestore} />
{:else}
  <slot name="loading" />
{/if}
