<script>import { setFirebaseContext } from "../stores/sdk.js";
export let firestore;
export let auth;
export let storage;
setFirebaseContext({ firestore, auth, storage });
</script>

<slot />
