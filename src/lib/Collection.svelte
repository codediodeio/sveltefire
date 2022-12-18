<script lang="ts">
  import type {
    CollectionReference,
    Firestore,
    Query,
  } from 'firebase/firestore';
  import { getContext } from 'svelte';
  import { collectionStore, key } from './stores';

  // TODO figure out how to make generics work
  // current setup will not work without mandatory startWith value
  // type T = $$Generic;

  // interface $$Slots {
  //   default: { data: T[], ref: CollectionReference | Query, count: number }
  // }

  interface $$Slots {
    default: { data: any[]; ref: CollectionReference | Query; count: number },
    loading: {},
  }

  const config = getContext<any>(key);

  export let ref: string | CollectionReference | Query;
  export let firestore: Firestore = config.getFirestore();
  export let startWith: any = undefined;

  let store = collectionStore(firestore, ref, startWith);
</script>

{#if $store !== undefined}
  <slot data={$store} ref={store.ref} count={$store?.length ?? 0} />
{:else}
  <slot name="loading" />
{/if}