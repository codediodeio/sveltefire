<script>import { userStore } from "../stores/auth.js";
import { getFirebaseContext } from "../stores/sdk.js";
import { signOut } from "firebase/auth";
const auth = getFirebaseContext().auth;
const user = userStore();
</script>
  
  {#if $user}
    <slot user={$user} {auth} signOut={() => signOut(auth)} />
  {/if}