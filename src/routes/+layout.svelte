<script lang="ts">
    import FirebaseApp from '$lib/components/FirebaseApp.svelte';
    import { db as firestore, auth, rtdb, storage, app } from './firebase.js';
</script>

<FirebaseApp {app} {auth} {rtdb} {firestore} {storage}>
    <slot />
</FirebaseApp>
