<script lang="ts">
    import type { Auth } from 'firebase/auth';
    import type { Firestore } from 'firebase/firestore';
    import { onDestroy, setContext } from 'svelte';
    import { key } from './stores';

    export let firestore: Firestore;
    export let auth: Auth;

    setContext(key, {
	    getFirestore: () => firestore,
        getAuth: () => auth,
    });
    
    onDestroy(() => {
        setContext(key, null);
    });

</script>

<slot />