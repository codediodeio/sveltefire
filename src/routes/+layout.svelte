<script lang="ts">
    import FirebaseApp from '$lib/components/FirebaseApp.svelte';
    import { db as firestore, auth, storage } from './firebase.js';

</script>

<FirebaseApp {auth} {firestore} {storage}>
    <slot />
</FirebaseApp>
