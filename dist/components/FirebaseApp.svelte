<script>import { setFirebaseContext } from "../stores/sdk.js";
export let firestore;
export let rtdb;
export let auth;
setFirebaseContext({ firestore, rtdb, auth });
</script>

<slot />
