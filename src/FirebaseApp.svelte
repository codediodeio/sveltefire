<script>
    import { onMount, setContext, createEventDispatcher } from 'svelte';
    export let firebase;
    export let perf = false;
    export let analytics = false;

    // Ready required to use the app event, 
    // prevents child components from running before init
    let ready = false;

    // Init perf and analytics
    perf && firebase.performance();
    analytics && firebase.analytics();

    // Emit firebase
    const dispatch = createEventDispatcher();

    // Set firebase context
    setContext('firebase', firebase);

    onMount(() => {
        
        // Optional event to set additional config
        dispatch('initializeApp', {
		    firebase,
        });
        

        ready = true;
    })

</script>


{#if ready}
    <slot></slot>
{/if}
