---
title: SvelteFire?
pubDate: 2023-07-23
description: "Why use SvelteFire over vanilla Firebase?"
layout: ../layouts/MainLayout.astro
---

# 🔥 SvelteFire

SvelteFire is a minimal, yet powerful library that puts realtime Firebase data into Svelte stores.

## Why?

Firebase realtime APIs are callback-based, but we can dramatically improve the developer experience by leveraging Svelte's reactive stores.

- Access users and realtime Firestore data as Svelte stores
- Automatic subscription disposal to prevent duplicate reads
- Better TypeScript experience for Firebase
- Handle complex relational data between Auth and Firestore
- Easily hydrate SvelteKit server data into a realtime Firebase stream

## Store Example

Get the current user:

```svelte
<script>
  const user = userStore();
</script>

Hello {$user.uid}
```

Get a Firestore document. Any changes to the document will be reflected instantly:

```svelte
<script>
  const post = docStore("posts/hi-mom");
</script>

{$post.title}
{$post.content}
```

## Component Example

We can take this a step further with components and slot props. Under the hood, these components use the same stores as above, but make common patterns dead simple. The example below renders content for the signed-in user while fetching multiple levels of relational data `user->post->comments`.

```svelte
<!-- 1. 🔥 Firebase App -->
<FirebaseApp {auth} {firestore}>

    <!-- 2. 👤 Get the current user -->
    <SignedIn let:user>

        <p>Howdy, {user.uid}</p>

        <!-- 3. 📜 Get a Firestore document owned by a user -->
        <Doc ref={`posts/${user.uid}`} let:data={post} let:ref={postRef}>

            <h2>{post.title}</h2>

            <!-- 4. 💬 Get all the comments in its subcollection -->
            <Collection ref={postRef.path + '/comments'} let:data={comments}>
                {#each comments as comment}

                {/each}
...
```
