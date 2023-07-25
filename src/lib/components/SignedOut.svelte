<script lang="ts">
    import { getFirebaseContext } from "$lib/stores/sdk.js";
    import { userStore } from "$lib/stores/auth.js";
    import type { Auth, User } from 'firebase/auth';
    getFirebaseContext
    const auth = getFirebaseContext().auth!;
    const user = userStore()

    interface $$Slots {
      default: { auth: Auth }
    }

  </script>
  
  {#if !$user}
    <slot {auth} />
  {/if}