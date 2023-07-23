<script lang="ts">
    import { userStore } from "$lib/stores/auth.js";
    const user = userStore()
  </script>
  
  {#if !$user}
    <slot />
  {/if}