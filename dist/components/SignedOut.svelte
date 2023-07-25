<script>import { getFirebaseContext } from "../stores/sdk.js";
import { userStore } from "../stores/auth.js";
getFirebaseContext;
const auth = getFirebaseContext().auth;
const user = userStore();
</script>
  
  {#if !$user}
    <slot {auth} />
  {/if}