<script>
  export let path;
  export let log = false;
  export let traceId = "";
  export let startWith = undefined; // Why? Firestore returns null for docs that don't exist, predictible loading state.
  export let maxWait = 10000;

  import { onDestroy, createEventDispatcher } from "svelte";
  import { docStore } from "./firestore";

  let store = docStore(path, {
    startWith,
    traceId,
    log,
    maxWait
  });

  const dispatch = createEventDispatcher();

  let unsub;

  // Props changed
  $: {
    if (unsub) {
      unsub();
      store = docStore(path, {
        startWith,
        traceId,
        log,
        maxWait
      });
    }

    dispatch("ref", { ref: store.ref });

    unsub = store.subscribe(data => {
      dispatch("data", {
        data
      });
    });
  }

  onDestroy(() => unsub());
</script>

{#if $store}
  <slot data={$store} ref={store.ref} error={store.error} />
{:else if store.loading}
  <slot name="loading" />
{:else}
  <slot name="fallback" />
{/if}
