<script generics="Data extends DocumentData">import { docStore } from "../stores/firestore.js";
import { getFirebaseContext } from "../stores/sdk.js";
export let ref;
export let startWith = void 0;
const { firestore } = getFirebaseContext();
let store = docStore(firestore, ref, startWith);
</script>

{#if $store !== undefined && $store !== null}
  <slot data={$store} ref={store.ref} {firestore} />
{:else}
  <slot name="loading" />
{/if}
