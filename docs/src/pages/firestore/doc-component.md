---
title: Doc Component
pubDate: 2023-07-23
description: SvelteFire Doc Component API reference
layout: ../../layouts/MainLayout.astro
---

# Doc

The `Doc` component is a wrapper around the `docStore`. It renders the document data and handles the loading state.

### Props

- `ref` - A Firestore document reference or path string (e.g. `posts/hi-mom`)
- `startWith` - (optional) initial value to use before the document is fetched

### Slots

- `default` - The document data
- `loading` - Loading state

### Slot Props

- `data` - The document data
- `ref` - The Firestore document reference
- `firestore` - The Firestore instance

### Example

```svelte
<script>
  import { Doc } from "sveltefire";
</script>

<Doc ref={"posts/id"} let:data>
  <p>{data?.title}</p>

  <p slot="loading">Loading...</p>
</Doc>
```
