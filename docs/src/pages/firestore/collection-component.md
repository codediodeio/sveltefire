---
title: Collection Component
pubDate: 2023-07-23
description: SvelteFire Collection Component API reference
layout: ../../layouts/MainLayout.astro
---

# Collection

The `Collection` component is a wrapper around the `collectionStore`. It renders the collection data and handles the loading state. 

### Props

- `ref` - A Firestore collection reference, query reference, or path string (e.g. `posts`)
- `startWith` - (optional) initial value to use before the collection is fetched

### Slots

- `default` - The collection data
- `loading` - Loading state

### Slot Props

- `data` - An array of document data
- `ref` - The Firestore collection reference
- `firestore` - The Firestore instance
- `count` - The number of documents returned by the query

### Example

```svelte
<script>
    import { Collection } from 'sveltefire';
</script>

<Collection ref={'posts'} let:data let:count>

    <p>Found {count} posts</p>
    
    {#each data as post}
        <p>{post.title}</p>
    {/each}

    <p slot="loading">Loading...</p>
</Collection>
```