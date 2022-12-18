<script lang="ts">
  import type { DocumentReference, Firestore } from 'firebase/firestore';
  import { getContext } from 'svelte';
  import { docStore, key } from './stores';

  // TODO figure out how to make generics work
  // code below will not work without mandatory startWith value

  // type T = $$Generic;

  // interface $$Slots {
  //   default: { data: T & { [key: string]: any}, ref: DocumentReference }
  // }

  interface $$Slots {
    default: { data: any; ref: DocumentReference },
    loading: {},
  }

  const config = getContext<any>(key);

  export let ref: string | DocumentReference;
  export let firestore: Firestore = config?.getFirestore();
  export let startWith: any = undefined;

  let store = docStore(firestore, ref, startWith);
</script>

{#if $store !== undefined}
  <slot data={$store} ref={store.ref} />
{:else}
  <slot name="loading" />
{/if}
