<script>
  export let path;
  export let log = false;
  export let traceId = "";
  export let startWith = undefined; // Why? Firestore returns null for docs that don't exist, predictible loading state.
  export let maxWait = 10000;
  export let once = false;

  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import { uploadFileStore } from "./storage";

  const opts = {
    startWith,
    traceId,
    log,
    maxWait,
    once
  }

  let store = uploadFileStore(path, opts);

  const dispatch = createEventDispatcher();

  let unsub;

  // Props changed
  $: {
    if (unsub) {
      // Unsub and create new store
      unsub();
      store = uploadFileStore(path, opts);
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
{:else if store.loading}
  <slot name="loading" />
{:else}
  <slot name="fallback" />
{/if}

<slot name="after" />