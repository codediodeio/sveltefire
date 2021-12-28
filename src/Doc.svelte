<script lang="ts">
  import type { DocumentReference } from "firebase/firestore";
  import type { Unsubscriber } from "svelte/store";
  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import { docStore, DocumentOpts } from "./firestore";

  export let path :string|DocumentReference;
  export let log = false;
  export let traceId = "";
  export let startWith = undefined; // Why? Firestore returns null for docs that don't exist, predictible loading state.
  export let maxWait = 10000;
  export let once = false;

  const opts :DocumentOpts = {
    startWith,
    traceId,
    log,
    maxWait,
    once
  }

  let store = docStore(path, opts);

  const dispatch = createEventDispatcher();

  let unsub :Unsubscriber;

  // Props changed
  $: {
    if (unsub) {
      // Unsub and create new store
      unsub();
      store = docStore(path, opts);
      dispatch("ref", { ref: store.ref });
    }

    unsub = store.subscribe(data => {
      dispatch("data", {
        data
      });
    });
  }

  onMount(() => dispatch("ref", { ref: store.ref }))
  onDestroy(() => unsub());
</script>

<slot name="before" />

{#if $store}
  <slot data={$store} ref={store.ref} error={store.error} />
{:else if store.loading}
  <slot name="loading" />
{:else}
  <slot name="fallback" />
{/if}

<slot name="after" />