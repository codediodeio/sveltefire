<script>import { collectionStore } from "../stores/firestore.js";
import { getFirebaseContext } from "../stores/sdk.js";
export let ref;
export let startWith = void 0;
const { firestore } = getFirebaseContext();
let store = collectionStore(firestore, ref, startWith);
</script>

{#if $store !== undefined}
  <slot data={$store} ref={store.ref} count={$store?.length ?? 0} {firestore} />
{:else}
  <slot name="loading" />
{/if}
