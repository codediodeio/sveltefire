<script>
  export let path = "";
  export let log = false;
  export let traceId = "";
  export let startWith = undefined;
  export let url = true;
  export let meta = false;

  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import { fileDownloadStore } from "./storage";

  const opts = {
    startWith,
    traceId,
    log,
    meta,
    url,
  };

  let store = fileDownloadStore(path, opts);

  const dispatch = createEventDispatcher();

  let unsub;

  // Props changed
  $: {
    if (unsub) {
      // Unsub and create new store
      unsub();
      store = fileDownloadStore(path, opts);
      dispatch("ref", { ref: store.ref });
    }

    unsub = store.subscribe(result => {
     if (result) {
      dispatch("storageResult", {
        downloadURL: result[0],
        metadata: result[1],
      });
     }

    });
  }

  onMount(() => dispatch("ref", { ref: store.ref }));
  onDestroy(() => unsub());
</script>

<slot name="before" />

{#if $store}
  <slot
    downloadURL={$store && $store.url}
    metadata={$store && $store.metadata}
    ref={store.ref}
    error={store.error} />
{:else if store.loading}
  <slot name="loading" />
{:else}
  <slot name="fallback" />
{/if}

<slot name="after" />
