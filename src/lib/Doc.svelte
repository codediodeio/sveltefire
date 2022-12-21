<script lang="ts">
  import type { DocumentReference, Firestore } from 'firebase/firestore';
  import { docStore, sdk } from './stores';

  // TODO figure out how to make generics work
  // code below will not work without mandatory startWith value

  // type T = $$Generic;

  // interface $$Slots {
  //   default: { data: T & { [key: string]: any}, ref: DocumentReference }
  // }

  interface $$Slots {
    default: { data: any; ref: DocumentReference | null },
    loading: {},
  }

  export let ref: string | DocumentReference;
  export let firestore: Firestore = $sdk?.firestore;
  export let startWith: any = undefined;

  let store = docStore(firestore, ref, startWith);
</script>

{#if $store !== undefined}
  <slot data={$store} ref={store.ref} />
{:else}
  <slot name="loading" />
{/if}
