---
title: nodeListStore
pubDate: 2023-11-23
description: SvelteFire nodeStore API reference
layout: ../../layouts/MainLayout.astro
---

# nodeListStore

Subscribes to RealtimeDB node list data and listens to real-time updates. 

### Parameters

- `rtdb` - RealtimeDB instance
- `path` - A RealtimeDB path string (e.g. `posts`)
- `startWith` - (optional) initial value to use before the data is fetched

### Example

```svelte
<script>
    import { nodeListStore } from 'sveltefire';
    import { rtdb } from '$lib/firebase'; // your rtdb instance

    const posts = nodeListStore(rtdb, 'posts');
</script>

{#each $posts as post}
    <p>{post.title}</p>
{/each}
```