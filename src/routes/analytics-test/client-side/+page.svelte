<script lang="ts">
    import PageView from '$lib/components/PageView.svelte';
    const customParams = {
        mood: 'happy'
    };

    const title = 'Analytics Test Page 2 - Client Rendered';

</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<!-- <PageView {customParams} /> -->

<h1>{title}</h1>

<p>
    This is a test page for analytics. The title is always server rendered.
</p>

<a href="/analytics-test">Analytics SSR Test</a>

