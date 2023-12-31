---
title: UploadTask Component
pubDate: 2023-07-23
description: SvelteFire UploadTask Component API reference
layout: ../../layouts/MainLayout.astro
---

# UploadTask

Uploads a file to a Firebase storage bucket. 

### Props

- `ref` - A Firebase Storage reference or path string (e.g. `files/hi-mom.txt`)
- `data` - the file data to be uploaded as `Blob | Uint8Array | ArrayBuffer`
- `metadata` - (optional) file metadata


### Slots

- `default` 

### Slot Props

- `snapshot` - Firebase UploadTaskSnapshot
- `task` - Firebase UploadTask
- `progress` - Number as a percentage of the upload progress
- `storage` - The Firebase Storage instance

### Example

```svelte
<script>
  import  { DownloadURL, UploadTask } from "sveltefire";

  let file;

  function chooseFile(e) {
    file = e.target.files[0];
  }
</script>

<input type="file" on:change={chooseFile} />

{#if file}
  <UploadTask ref="myFile.txt" data={file} let:progress let:snapshot>
    {#if snapshot?.state === "running"}
      {progress}% uploaded
    {/if}

    {#if snapshot?.state === "success"}
      <DownloadURL ref={snapshot?.ref} let:link>
        <a href={link} download>Link</a>
      </DownloadURL>
    {/if}
  </UploadTask>
{/if}
```