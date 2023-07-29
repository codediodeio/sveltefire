<script lang="ts">
  import { getFirebaseContext } from "../stores/sdk.js";
  import { userStore } from "../stores/auth.js";
  const auth = getFirebaseContext().auth!;
  const user = userStore(auth);
</script>

{#if $user === undefined}
  <slot {auth}>Loading...</slot>
{/if}
