<script>import { userStore } from "../stores/auth.js";
const user = userStore();
</script>
  
  {#if !$user}
    <slot />
  {/if}