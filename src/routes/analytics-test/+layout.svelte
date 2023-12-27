<script lang="ts">
  import { page } from "$app/stores";
  import PageView from "$lib/components/PageView.svelte";
</script>

<slot />

<h2>Analytics Layout</h2>
{#key $page.route.id}
  <p>Logged analytics for {$page.route.id}</p>
  <PageView />
{/key}
