<script>import { setFirebaseContext } from "../stores/sdk.js";
export let firestore;
export let rtdb;
export let auth;
export let storage;
setFirebaseContext({ firestore, rtdb, auth, storage });
</script>

<slot />
