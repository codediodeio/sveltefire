<script lang="ts">
  import FirebaseApp from "$lib/components/FirebaseApp.svelte";
  import { db as firestore, auth, rtdb, storage, analytics } from "./firebase.js";
</script>

<svelte:head>
  <style>
    body {
      background-color: #000000;
      font-family: system-ui, sans-serif;
    }
  </style>
</svelte:head>

<FirebaseApp {auth} {firestore} {rtdb} {storage} {analytics}>
  <slot />
</FirebaseApp>
