<script lang="ts">
  import Doc from "$lib/components/Doc.svelte";

  export let data;
</script>

<h1>Not Hydrated: {data?.title}</h1>

<Doc ref="posts/test" startWith={data} let:data={realtimeData}>
  <h1>Hydrated: {realtimeData?.title}</h1>
</Doc>

<p>
  <a href="/">Home</a>
</p>
