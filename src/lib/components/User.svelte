<script lang="ts">
  import type { User } from "firebase/auth";
  import { userStore } from "$lib/stores/auth.js";

  interface $$Slots {
    default: { user: User }
    signedOut: {}
  }

  const user = userStore()
</script>

{#if $user}
  <slot user={$user} />
{:else}
  <slot name="signedOut" />
{/if}