<script>import { userStore } from "../stores/auth.js";
import { getFirebaseContext } from "../index.js";
const auth = getFirebaseContext().auth;
const user = userStore(auth);
</script>

{#if $user}
  <slot user={$user} />
{:else}
  <slot name="signedOut" />
{/if}