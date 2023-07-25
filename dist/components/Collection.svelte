<script>import { collectionStore } from "../stores/firestore.js";
export let ref;
export let startWith = void 0;
let store = collectionStore(ref, startWith);
</script>

{#if $store !== undefined}
  <slot data={$store} ref={store.ref} count={$store?.length ?? 0} />
{:else}
  <slot name="loading" />
{/if}
