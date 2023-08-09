<script lang="ts">
    import DownloadLink from "$lib/components/DownloadLink.svelte";
    import StorageList from "$lib/components/StorageList.svelte";
</script>

<h1>Storage Test</h1>

<StorageList ref="/" let:list>
    <ul>
        {#if list === null}
            <li>Loading...</li>
        {:else if list.prefixes.length === 0 && list.items.length === 0}
            <li>Empty</li>
        {:else}
            {#each list.items as item}
                <li>
                    <DownloadLink ref={item} let:link let:ref>
                        <a data-testid="download-link" href="{link}" download>{ref?.name}</a>
                    </DownloadLink>
                </li>
            {/each}
        {/if}
    </ul>
</StorageList>
