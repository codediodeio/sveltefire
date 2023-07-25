<script lang="ts">
  import type {
    CollectionReference,
    Query,
  } from 'firebase/firestore';
  import { collectionStore } from '../stores/firestore.js';

  // TODO figure out how to make generics work
  // current setup will not work without mandatory startWith value
  // type T = $$Generic;

  // interface $$Slots {
  //   default: { data: T[], ref: CollectionReference | Query, count: number }
  // }

  interface $$Slots {
    default: { data: any[]; ref: CollectionReference | Query | null; count: number },
    loading: {},
  }

  export let ref: string | CollectionReference | Query;
  export let startWith: any = undefined;


  let store = collectionStore(ref, startWith);
</script>

{#if $store !== undefined}
  <slot data={$store} ref={store.ref} count={$store?.length ?? 0} />
{:else}
  <slot name="loading" />
{/if}
