---
title: Common SvelteFire Patterns
pubDate: 2023-12-23
description: How to implement common patters with Svelte and Firebase
layout: ../../layouts/MainLayout.astro
---

# Common Patterns

## Fetch Data from Firestore for Authenticated Users

First, Use the `SignedIn` component to access the UID of the current user. Second, pass that UID to the `Doc` or `Collection` component to fetch a Firestore document owned by that user. 

```svelte
  <SignedIn let:user>
    <Doc ref={`posts/${user.uid}`} let:data={post}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
    </Doc>
  </SignedIn>
```

## SSR with SvelteKit

SvelteFire is a client-side library, but allows you to hydrate server data into a realtime stream.

First, fetch data from a load function like so:

```ts
// +page.ts
import { doc, getDoc } from 'firebase/firestore';

export const load = (async () => {
  const ref = doc(firestore, 'posts', 'first-post');
  const snapshot = await getDoc(ref);
  return {
    post: snapshot.data();
  };
});
```

Second, pass the server data as the `startWith` value to a store. This will bypass the loading state and ensure the data is rendered in the server HTML, then realtime listeners will be attached afterwards. 

```svelte
// +page.svelte  
<script lang="ts">
  export let data: PageData;
</script>

<!-- Example using component -->
<Doc startWith={data.post} ref="posts/first-post" let:data={post}>
    <h2>{post.title}</h2>
    <p>{post.content}</p>
</Doc>
```

Note: This will result in 2 reads from Firestore on initial page load, so only use this pattern when true realtime data necessary.

## Dynamic Firestore Queries

Imagine you have a collection of posts what a user can filter by category. Create a reactive declaration to re-run the query whenever the category changes.

```svelte
<script lang="ts">
    import { query, collection, where } from 'firebase/firestore';

    let category = 'tech';

    $: q = query(
            collection(firestore, `posts`),
            where('category', '==', category)
        );
</script>

<Collection ref={q} let:data={posts}>
    <ul>
        {#each posts as post (post.id)}
        <li>{post.content}</li>
        {/each}
    </ul>
</Collection>

<button on:click={() => category = 'sports'}>Sports</button>
```
## Handle File Uploads with Progress Bar

The example below shows how to upload a file to Firebase Storage and display a progress bar. First, get a file from the user. Second, pass the file to the `UploadTask` component. Third, display the progress bar and download link.


```svelte
<script lang="ts">
  let file: File;
  let filePath = "things/test.png";

  function chooseFile(event) {
    file = event.target.files[0];
  }
</script>

<input type="file" on:change={chooseFile} />

{#if file}
  <UploadTask ref={filePath} data={file} let:progress let:snapshot>
    {#if snapshot?.state === "running" || snapshot?.state === "success"}
      <p>{progress}% uploaded</p>
      <progress value={progress} max="100" />
    {/if}

    {#if snapshot?.state === "error"}
      Upload failed
    {/if}

    {#if snapshot?.state === "success"}
      <DownloadURL ref={snapshot?.ref} let:link let:ref>
        <a href={link} download> {ref?.name} </a>
      </DownloadURL>
    {/if}
  </UploadTask>
{/if}
```