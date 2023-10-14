<script lang="ts">
  import { userStore } from "$lib/stores/auth.js";
  import { getFirebaseContext } from "$lib/stores/sdk.js";
  import { signOut, type User, type Auth } from "firebase/auth";

  const auth = getFirebaseContext().auth!;
  const user = userStore(auth);

  interface $$Slots {
    default: { user: User; auth: Auth; signOut: () => Promise<void> };
  }
</script>

{#if $user}
  <slot user={$user} {auth} signOut={() => signOut(auth)} />
{/if}
