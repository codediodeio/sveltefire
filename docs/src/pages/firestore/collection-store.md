---
title: collectionStore
pubDate: 2023-07-23
description: SvelteFire collectionStore API reference
layout: ../../layouts/MainLayout.astro
---

# collectionStore

Subscribes to Firestore collection data and listens to real-time updates.

### Parameters

- `firestore` - Firestore instance
- `ref` - A Firestore collection reference, query reference, or path string (e.g. `posts`)
- `startWith` - (optional) initial value to use before the document is fetched

### Example

```svelte
<script>
  import { collectionStore } from "sveltefire";
  import { firestore } from "$lib/firebase"; // your firestore instance

  const posts = collectionStore(firestore, "posts");
</script>

{#each $posts as post}
  <p>{post.title}</p>
{/each}
```

With a query reference:

```svelte
<script>
  import { collectionStore } from "sveltefire";
  import { firestore } from "$lib/firebase";
  import { collection, where, query } from "firebase/firestore";

  const postsRef = collection("posts");
  const q = query(postsRef, where("author", "==", "jeff"));

  const postsByJeff = collectionStore(firestore, q);
</script>
```

With TypeScript:

```svelte
<script lang="ts">
  interface Post {
    title?: string;
    content?: string;
  }

  const posts = collectionStore<Post[]>(firestore, "posts");
</script>

{#each $posts as post}
  <p>{post.title}</p>
{/each}
```
