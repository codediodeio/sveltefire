<script lang="ts">
  import type { DocumentReference, Firestore } from 'firebase/firestore';
  import { docStore } from '$lib/stores/firestore.js';


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
  export let startWith: any = undefined;

  let store = docStore(ref, startWith);
  
</script>

{#if $store !== undefined}
  <slot data={$store} ref={store.ref} />
{:else}
  <slot name="loading" />
{/if}
