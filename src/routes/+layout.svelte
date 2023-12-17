<script lang="ts">
  import FirebaseApp from "$lib/components/FirebaseApp.svelte";
  import { db as firestore, auth, rtdb, storage } from "./firebase.js";
</script>

<FirebaseApp {auth} {firestore} {rtdb} {storage}>
  <slot />
</FirebaseApp>
