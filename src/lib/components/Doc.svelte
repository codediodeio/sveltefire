<script lang="ts">
  import type { DocumentReference, Firestore } from 'firebase/firestore';
  import { docStore } from '../stores/firestore.js';
  import { getFirebaseContext } from '../stores/sdk.js';


  // TODO figure out how to make generics work
  // code below will not work without mandatory startWith value

  // type T = $$Generic;

  // interface $$Slots {
  //   default: { data: T & { [key: string]: any}, ref: DocumentReference }
  // }

  export let ref: string | DocumentReference;
  export let startWith: any = undefined;

  const { firestore } = getFirebaseContext();

  let store = docStore(firestore!, ref, startWith);

  interface $$Slots {
    default: { data: any; ref: DocumentReference | null; firestore?: Firestore },
    loading: {},
  }
  
</script>

{#if $store !== undefined}
  <slot data={$store} ref={store.ref} {firestore} />
{:else}
  <slot name="loading" />
{/if}
