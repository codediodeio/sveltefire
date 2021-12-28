<script lang="ts">
import type { StorageReference } from "firebase/storage";

  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import type { Unsubscriber } from "svelte/store";
  import { UploadOpts, uploadTaskStore } from "./storage";

  export let path :string|StorageReference;
  export let file :any;
  export let log = false;
  export let traceId = "";

  const opts :UploadOpts = {
    traceId,
    log,
  }

  let store = uploadTaskStore(path, file, opts);

  const dispatch = createEventDispatcher();

  let unsub :Unsubscriber;

  // Props changed
  $: {
    if (unsub) {
      // Unsub and create new store
      unsub();
      store = uploadTaskStore(path, file, opts);
      dispatch("ref", { ref: store.ref });
    }

    unsub = store.subscribe(snapshot => {
      dispatch("snapshot", {
        snapshot
      });
    });
  }

  onMount(() => dispatch("ref", { ref: store.ref }))
  onDestroy(() => unsub());
</script>

<slot name="before" />

{#if $store}
  <slot 
    snapshot={$store} 
    ref={store.ref} 
    task={store.task}
    downloadURL={store.downloadURL} 
    error={store.error} />
{:else}
  <slot name="fallback" />
{/if}

{#if store.downloadURL}
  <slot name="complete" />
{/if}

<slot name="after" />