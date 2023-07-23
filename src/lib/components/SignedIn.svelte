<script lang="ts">
    import { userStore } from "$lib/stores/auth.js";  
    import { getFirebaseContext } from "$lib/stores/sdk.js";
    import { signOut, type User } from "firebase/auth";
    
    interface $$Slots {
      default: { user: User, signOut: () => Promise<void> }
    }

    const auth = getFirebaseContext().auth!;
    const user = userStore()
    
  </script>
  
  {#if $user}
    <slot user={$user} signOut={() => signOut(auth)} />
  {/if}