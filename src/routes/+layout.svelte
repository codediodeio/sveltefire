<script lang="ts">
    import FirebaseApp from '$lib/components/FirebaseApp.svelte';
    import { db as firestore, auth, storage, app } from './firebase.js';

</script>

<FirebaseApp {app} {auth} {firestore} {storage}>
    <slot />
</FirebaseApp>
