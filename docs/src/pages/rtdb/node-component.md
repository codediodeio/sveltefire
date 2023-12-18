---
title: Node Component
pubDate: 2023-07-23
description: SvelteFire Node Component API reference
layout: ../../layouts/MainLayout.astro
---

# Node

The `Node` component is a wrapper around the `nodeStore`. It renders the node data and handles the loading state. 

### Props

- `path` - RealtimeDB path string (e.g. `posts/hi-mom`)
- `startWith` - (optional) initial value to use before the data is fetched

### Slots

- `default` - The node data
- `loading` - Loading state

### Slot Props

- `data` - The node data
- `path` - The Database reference
- `rtdb` - The Database instance

### Example

```svelte
<script>
    import { Node } from 'sveltefire';
</script>

<Node path={'posts/id'} let:data>
    <p>{data?.title}</p>

    <p slot="loading">Loading...</p>
</Node>
```