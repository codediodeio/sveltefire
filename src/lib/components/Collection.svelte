<script lang="ts" generics="Data extends DocumentData">
  import type {
    CollectionReference,
    DocumentData,
    Firestore,
    Query,
  } from "firebase/firestore";
  import { collectionStore } from "../stores/firestore.js";
  import { getFirebaseContext } from "../stores/sdk.js";

  export let ref: string | CollectionReference<Data> | Query<Data>;
  export let startWith: Data[] | undefined = undefined;

  const { firestore } = getFirebaseContext();

  let store = collectionStore<Data>(firestore!, ref, startWith);

  interface $$Slots {
    default: {
      data: Data[];
      error: Error | null;
      ref: CollectionReference<Data[]> | Query<Data[]> | null;
      count: number;
      firestore?: Firestore;
    };
    loading: {};
  }
</script>

{#if $store !== undefined}
  <slot data={$store?.data} error={$store?.error} ref={store.ref} count={$store?.data?.length ?? 0} {firestore} />
{:else}
  <slot name="loading" />
{/if}
