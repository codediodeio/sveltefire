---
title: DownloadURL Component
pubDate: 2023-07-23
description: SvelteFire DownloadURL Component API reference
layout: ../../layouts/MainLayout.astro
---

# DownloadURL

Returns the download URL for a file in Firebase Storage.

### Props

- `ref` - A Firebase Storage reference or path string (e.g. `files/hi-mom.txt`)

### Slots

- `default` - Shown when the url is available
- `loading` - Shown while the url is loading

### Slot Props

- `link` - The download URL
- `ref` - Storage reference
- `storage` - The Firestore instance

### Example

```svelte
<script>
  import  { DownloadURL } from "sveltefire";
</script>


<DownloadURL ref="images/pic.png" let:link let:ref>
    <!-- show img -->
    <img src={link} />

    <!-- or download via link -->
    <a href={link} download>{ref?.name}</a>
</DownloadURL>
```