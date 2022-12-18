<script lang="ts">
  import type { Auth, User } from "firebase/auth";
  import { getContext } from "svelte";
  import { key, userStore } from "./stores";

  interface $$Slots {
    default: { user: User }
    signedOut: {}
  }
  const config = getContext<any>(key);
  export let auth: Auth = config?.getAuth();

  const user = userStore(auth);
</script>

{#if $user}
  <slot user={$user} />
{:else}
  <slot name="signedOut" />
{/if}