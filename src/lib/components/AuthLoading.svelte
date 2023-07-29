<script lang="ts">
  import { userStore } from "../stores/auth.js";
</script>

{#if $user === undefined}
  <slot {auth}>Loading...</slot>
{/if}
