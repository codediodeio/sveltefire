<script lang="ts">
    import { downloadUrlStore } from '$lib/stores/storage.js';
    import { getFirebaseContext } from '$lib/stores/sdk.js';
    import type { FirebaseStorage, StorageReference } from 'firebase/storage';

    export let ref: string | StorageReference;

    const { storage } = getFirebaseContext();
    const store = downloadUrlStore(storage!, ref);

    interface $$Slots {
        default: { link: string | null; ref: StorageReference | null; storage?: FirebaseStorage },
        loading: {},
    }
</script>

{#if $store !== undefined}
    <slot link={$store} ref={store.reference} {storage}/>
{:else}
    <slot name="loading" />
{/if}

