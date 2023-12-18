---
title: nodeStore
pubDate: 2023-11-23
description: SvelteFire nodeStore API reference
layout: ../../layouts/MainLayout.astro
---

# nodeStore

Subscribes to RealtimeDB node and listens to realtime updates. 

### Parameters

- `rtdb` - RealtimeDB instance
- `path` - A RealtimeDB path string (e.g. `posts/hi-mom`)
- `startWith` - (optional) initial value to use before the data is fetched

### Example

```svelte
<script>
    import { nodeStore } from 'sveltefire';
    import { rtdb } from '$lib/rtdb'; // your RealtimeDB instance

    const post = nodeStore(rtdb, 'posts/id');
</script>

{$post?.title}
```