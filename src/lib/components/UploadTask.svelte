<script lang="ts">
  import { uploadTaskStore } from "$lib/stores/storage.js";
  import { getFirebaseContext } from "$lib/stores/sdk.js";
  import type {
    FirebaseStorage,
    UploadTask,
    StorageReference,
    UploadMetadata,
    UploadTaskSnapshot,
  } from "firebase/storage";

  export let ref: string | StorageReference;
  export let data: Blob | Uint8Array | ArrayBuffer;
  export let metadata: UploadMetadata | undefined = undefined;

  const { storage } = getFirebaseContext();
  const upload = uploadTaskStore(storage!, ref, data, metadata);

  interface $$Slots {
    default: {
      task: UploadTask | undefined;
      ref: StorageReference | null;
      snapshot: UploadTaskSnapshot | null;
      progress: number;
      storage?: FirebaseStorage;
    };
  }

  $: progress = ($upload?.bytesTransferred! / $upload?.totalBytes!) * 100 ?? 0;
</script>

{#if $upload !== undefined}
  <slot task={$upload?.task} snapshot={$upload} {progress} ref={upload.reference} {storage} />
{/if}
