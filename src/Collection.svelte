<script>
    export let path;
    export let query = null;
    export let traceId = '';
    export let log = false;
    export let startWith = undefined;
    export let maxWait = 10000;
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';

    import { collectionStore } from './firestore';

    const store = collectionStore(path, query, { startWith, traceId, log, maxWait });

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
    <slot data={$store} ref={store.ref} error={store.error}></slot>
{:else if store.loading}
    <slot name="loading"></slot>
{:else}
    <slot name="fallback"></slot>
{/if}