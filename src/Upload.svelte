<script>
  export let path;
  export let log = false;
  export let traceId = "";
  export let startWith = undefined; // Why? Firestore returns null for docs that don't exist, predictible loading state.
  export let maxWait = 10000;
  export let once = false;

  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import { fileStore } from "./storage";

  const opts = {
    startWith,
    traceId,
    log,
    maxWait,
    once
  }

  let store = fileStore(path, opts);

  const dispatch = createEventDispatcher();

  let unsub;

  // Props changed
  $: {
    if (unsub) {
      // Unsub and create new store
      unsub();
      store = fileStore(path, opts);
      dispatch("ref", { ref: store.ref });
    }

    unsub = store.subscribe(url => {
      dispatch("url", {
        url
      });
    });
  }

  onMount(() => dispatch("ref", { ref: store.ref }))
  onDestroy(() => unsub());
</script>

<slot name="before" />

{#if $store}
  <slot url={$store} ref={store.ref} error={store.error} />
{:else if store.complete}
  <slot name="complete" />
{:else}
  <slot name="fallback" />
{/if}

<slot name="after" />