<script lang="ts">
  import type { CollectionReference } from "firebase/firestore";
  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import type { Unsubscriber } from "svelte/store";
  import { CollectionOpts, collectionStore, QueryFunction } from "./firestore";

  export let path :string|CollectionReference;
  export let query :QueryFunction = null;
  export let traceId = "";
  export let log = false;
  export let startWith = undefined;
  export let maxWait = 10000;
  export let once = false;

  const opts :CollectionOpts = {
    startWith,
    traceId,
    log,
    maxWait,
    once
  }

  let store = collectionStore(path, query, opts);

  const dispatch = createEventDispatcher();

  let unsub :Unsubscriber;

  // Props changed
  $: {
    if (unsub) {
      unsub();
      store = collectionStore(path, query, opts);
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
  <slot data={$store} ref={store.ref} error={store.error} first={store.meta.first} last={store.meta.last} />
{:else if store.loading}
  <slot name="loading" />
{:else}
  <slot name="fallback" />
{/if}
<slot name="after" />
