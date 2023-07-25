<script lang="ts">
  import type {
    CollectionReference,
    Firestore,
    Query,
  } from 'firebase/firestore';
  import { collectionStore } from '../stores/firestore.js';
  import { getFirebaseContext } from '../stores/sdk.js';

  // TODO figure out how to make generics work
  // current setup will not work without mandatory startWith value
  // type T = $$Generic;

  // interface $$Slots {
  //   default: { data: T[], ref: CollectionReference | Query, count: number }
  // }

  export let ref: string | CollectionReference | Query;
  export let startWith: any = undefined;

  const { firestore } = getFirebaseContext();

  let store = collectionStore(firestore!, ref, startWith);

  interface $$Slots {
    default: { data: any[]; ref: CollectionReference | Query | null; count: number; firestore?: Firestore },
    loading: {},
  }

</script>

{#if $store !== undefined}
  <slot data={$store} ref={store.ref} count={$store?.length ?? 0} {firestore} />
{:else}
  <slot name="loading" />
{/if}
