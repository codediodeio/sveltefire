<script lang="ts">
  import FirebaseApp from "$lib/components/FirebaseApp.svelte";
  import { db as firestore, auth, rtdb } from "./firebase.js";
</script>

<FirebaseApp {auth} {firestore} {rtdb} >
  <slot />
</FirebaseApp>
