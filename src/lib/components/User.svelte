<script lang="ts">
  import type { User } from "firebase/auth";
  import { userStore } from "$lib/stores/auth.js";
  import { getFirebaseContext } from "$lib/index.js";

  const auth = getFirebaseContext().auth!;
  const user = userStore(auth);

  interface $$Slots {
    default: { user: User };
    signedOut: {};
  }
</script>

{#if $user}
  <slot user={$user} />
{:else}
  <slot name="signedOut" />
{/if}
