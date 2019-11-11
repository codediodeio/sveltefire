<script>
    export let path;
    export let log = false;
    export let traceId = '';
    export let startWith = undefined;  // Why? Firestore returns null for docs that don't exist, predictible loading state. 
    export let maxWait = 10000;

    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { docStore } from './firestore';
    
    
    let store = docStore(path, { startWith, traceId, log, maxWait });

    // CUSTOM EVENTS

    const dispatch = createEventDispatcher();

    let unsub;

    onMount(() => {
        dispatch('ref', { ref: store.ref });
        unsub = store.subscribe(data => {
            dispatch('data', {
                data
            });
        });
    });

    onDestroy(() => unsub());
</script>

{#if $store}
    <slot data={$store} ref={store.ref} firestore={store.firestore} error={store.error}></slot>
{:else if store.loading}
    <slot name="loading"></slot>
{:else}
    <slot name="fallback"></slot>
{/if}