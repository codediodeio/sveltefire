---
title: docStore
pubDate: 2023-07-23
description: SvelteFire docStore API reference
layout: ../../layouts/MainLayout.astro
---

# docStore

Subscribes to Firestore document data and listens to realtime updates. 

### Parameters

- `firestore` - Firestore instance
- `ref` - A Firestore document reference or path string (e.g. `posts/hi-mom`)
- `startWith` - (optional) initial value to use before the document is fetched

### Example

```svelte
<script>
    import { docStore } from 'sveltefire';
    import { firestore } from '$lib/firebase'; // your firestore instance

    const post = docStore(firestore, 'posts/id');
</script>

{$post?.title}
```

With a document reference:

```svelte
<script>
    import { docStore } from 'sveltefire';
    import { firestore } from '$lib/firebase'; // your firestore instance
    import { doc } from 'firebase/firestore';

    const postRef = doc('posts/id');
    const post = docStore(firestore, postRef);  
</script>
```

With TypeScript:

```svelte
<script lang="ts">

    interface Post {
        title?: string;
        content?: string;
    }

    const post = docStore<Post>(firestore, 'posts/id');
</script>

{$post?.title}
```