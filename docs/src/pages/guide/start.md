---
title: Install SvelteFire
pubDate: 2023-07-23
description: How to install SvelteFire
layout: ../../layouts/MainLayout.astro
---

# QuickStart

SvelteFire works in both SvelteKit and standalone Svelte apps. This guide assumes you're using SvelteKit. 


### 1. Install

```
npm i sveltefire firebase
```

### 2. Initialize

Initialize Firebase and add the `FirebaseApp` component to the component tree. Typically, this is done in the root `+layout.svelte` file to access Firebase on all pages. 

#### +layout.svelte
```svelte
<script lang="ts">
    import { FirebaseApp } from 'sveltefire';
    import { initializeApp } from 'firebase/app';
    import { getFirestore } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';

    // Initialize Firebase
    const app = initializeApp(/* your firebase config */);
    const firestore = getFirestore(app);
    const auth = getAuth(app);
</script>

<FirebaseApp {auth} {firestore}>
    <slot />
</FirebaseApp>
```

## 3. Use Firebase!

You can use stores to access the current user and Firestore.

```svelte
<script>
  import { docStore, userStore } from 'sveltefire';

  const user = userStore();
  const post = docStore('posts/id');

</script>

{$user?.displayName}
{$post?.content}
```

Or you can use components to more easily pass data around. Notice how slot props like `let:user` and `let:data` allow us to access data from the backend with minimal effort. Here are some common examples. 

```svelte
<script>
  import { SignedIn, SignedOut, Doc, Collection } from 'sveltefire';
  import { signInAnonymously } from "firebase/auth";
</script>

<SignedIn let:user let:signOut>
    <p>Hello {user.uid}</p>
    <button on:click={signOut}>Sign Out</button>
</SignedIn>

<SignedOut let:auth>
    <button on:click={() => signInAnonymously(auth)}>Sign In</button>
</SignedOut>

<Doc ref="posts/id" let:data>
    <h2>{data.title}</h2>
    <p>{data.content}</p>
</Doc>

<Collection ref="posts" let:data={posts}>
    {#each posts as post}
        <h2>{post.title}</h2>
        <p>{post.content}</p>
    {/each}
</Collection>
```
