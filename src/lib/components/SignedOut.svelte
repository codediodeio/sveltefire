<script lang="ts">
  import { getFirebaseContext } from "../stores/sdk.js";
  import { userStore } from "../stores/auth.js";
  import type { Auth } from "firebase/auth";

  const auth = getFirebaseContext().auth!;
  const user = userStore(auth);

  interface $$Slots {
    default: { auth: Auth };
  }
</script>

{#if !$user}
  <slot {auth} />
{/if}
