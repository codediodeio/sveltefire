<script lang="ts">
    import FirebaseApp from '$lib/components/FirebaseApp.svelte';
    import { db as firestore, auth } from './firebase.js';

</script>

<FirebaseApp {auth} {firestore}>

    <slot />
</FirebaseApp>
