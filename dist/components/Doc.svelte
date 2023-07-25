<script>import { docStore } from "../stores/firestore.js";
export let ref;
export let startWith = void 0;
let store = docStore(ref, startWith);
</script>

{#if $store !== undefined}
  <slot data={$store} ref={store.ref} />
{:else}
  <slot name="loading" />
{/if}
