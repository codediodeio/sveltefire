<script>import { setFirebaseContext } from "../stores/sdk.js";
export let firestore;
export let auth;
setFirebaseContext({ firestore, auth });
</script>

<slot />
