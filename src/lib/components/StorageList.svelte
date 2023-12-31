<script lang="ts">
    import { storageListStore } from '$lib/stores/storage.js';
    import { getFirebaseContext } from '$lib/stores/sdk.js';
    import type { FirebaseStorage, ListResult, StorageReference } from 'firebase/storage';

    export let ref: string | StorageReference;

    const { storage } = getFirebaseContext();
    const listStore = storageListStore(storage!, ref);

    interface $$Slots {
        default: { list: ListResult | null; ref: StorageReference | null; storage?: FirebaseStorage, error: Error | null },
        loading: {},
    }
</script>

{#if $listStore !== undefined && $listStore !== null}
    <slot list={$listStore.data ?? null} error={$listStore.error} ref={listStore.reference} {storage} />
{:else}
    <slot name="loading" />
{/if}

