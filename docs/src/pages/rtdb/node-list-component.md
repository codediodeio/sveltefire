---
title: NodeList Component
pubDate: 2023-07-23
description: SvelteFire NodeList Component API reference
layout: ../../layouts/MainLayout.astro
---

# NodeList

The `NodeList` component is a wrapper around the `nodeListStore`. It renders the node list data and handles the loading state. 

### Props

- `path` - RealtimeDB reference
- `startWith` - (optional) initial value to use before the collection is fetched

### Slots

- `default` - The node list data
- `loading` - Loading state

### Slot Props

- `data` - An array of nodes
- `ref` - The Database node reference
- `rtdb` - The Database instance
- `count` - The number of nodes returned by the query

### Example

```svelte
<script>
    import { NodeList } from 'sveltefire';
</script>

<NodeList path={'posts'} let:data let:count>

    <p>Found {count} posts</p>
    
    {#each data as post}
        <p>{post.title}</p>
    {/each}

    <p slot="loading">Loading...</p>
</NodeList>
```