# SvelteFire

A minimal, yet powerful library that puts realtime Firebase data into Svelte stores.

[Documentation](https://sveltefire.fireship.io)

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

## Why?

Svelte makes it possible to dramatically simplify the way developers work with Firebase. Here are some problems the project solves:

- Access users and realtime Firestore data as Svelte stores
- Automatic subscription disposal to prevent memory/cost leaks
- Better TypeScript experience for Firebase
- Handle complex relational data between Auth and Firestore
- Easily hydrate SvelteKit server data into a realtime Firebase stream

## Quick Start

1. Install Firebase npm i firebase v9+ and initialize it in a file like lib/firebase.js:

```
npm i sveltefire firebase
```

```ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(/* your firebase config */);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

2. Get the Current user

```svelte
<script>
  import { auth } from "$lib/firebase";
  import { userStore } from "sveltefire";
  const user = userStore(auth);
</script>

Hello {$user?.uid}
```

3. Listen to realtime data.

Use the `$` as much as you want - it will only result in one Firebase read request. When all the subscriptions are removed, it will automatically unsubscribe.

```svelte
<script>
  import { firestore } from "$lib/firebase";
  import { docStore } from "sveltefire";

  const post = docStore(firestore, "posts/test");
</script>

{$post?.content}
{$post?.title}
```

Or better yet, use the built in `Doc` and `Collection` components. See below.

## Stores

Stores are the building blocks of SvelteFire.

### Auth Store

Listen to the current user. Render UI conditionally based on the auth state:

```svelte
<script>
  import { userStore } from "sveltefire";

  const user = userStore(auth);
</script>

{#if $user}
  <p>Hi {$user.uid}</p>
{:else}
  <p>Sign in...</p>
{/if}
```

### Firestore Stores

Subscribe to realtime data. The store will unsubscribe automatically to avoid unnecessary Firestore reads.

```svelte
<script>
  import { docStore, collectionStore } from "sveltefire";

  const post = docStore(firestore, "posts/test");

  // OR

  const posts = collectionStore(firestore, "posts");
</script>

{$post?.content}

{#each $posts as post}{/each}
```

Cast Firebase data to a TS interface:

```ts
interface Post {
  id: string;
  title: string;
  content: string;
}
const post = docStore<Post>(firestore, "posts/test");
const posts = collectionStore<Post>(firestore, "posts");
```

## SSR

SvelteFire is a client-side library, but allows you to hydrate server data into a realtime stream.

First, fetch data from a load function like so:

```ts
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

```ts
// Data fetched via server
export let data: PageData;

// Just give the store a startWith value
const post = docStore(firestore, "posts/test", data.post);
```

## Realtime Components

In addition to stores, SvelteFire provides a set of components that can build complex realtime apps without leaving the HTML.

### FirebaseApp

The `FirebaseApp` component puts the FirebaseSDK into Svelte context. This avoids the need to pass `auth` and `firestore` down to every component. It is typically placed in root layout.

```svelte
<!-- +layout.svelte -->
<script>
  // Initialize Firebase...
  const db = getFirestore(app);
  const auth = getAuth(app);
</script>

<FirebaseApp {auth} {firestore}>
  <User let:user />
  <!-- other sveltefire components here -->
</FirebaseApp>
```

You can use Svelte's context API to access the Firebase SDK in any component.

```svelte
<script>
  import { getFirebaseContext } from "sveltefire";
  const { auth, firestore } = getFirebaseContext();
</script>
```

### User

Get the current user.

```svelte
<SignedIn let:user>
  Hello {user.uid}
</SignedIn>

<SignedOut>You need to sign in!</SignedOut>
```

### Doc

Fetch a single document and listen to data in realtime. The `data` slot prop provides access to the fetched data, while `ref` is the Firestore document reference.

```svelte
<Doc ref="posts/test" let:data let:ref>
  {data.content}
  {ref.path}
</Doc>
```

Slot props can be renamed:

```svelte
<Doc ref="posts/test" let:data={post} let:ref={postRef}>
  {post.content}
  {postRef.path}
</Doc>
```

Firestore components can also handle loading states:

```svelte
<Doc path="posts/test">
  <!-- data renders here in the default slot -->
  <div slot="loading">Loading.... This will disappear when data is defined</div>
</Doc>
```

Pass a `startWith` value to bypass the loading state. This is useful in SvelteKit when you need to hydrate server data into a realtime stream:

```svelte
<Doc ref="posts/test" startWith={dataFromServer}>
```

### Collection

Collections provides array of objects containing the document data, as well as the `id` and `ref` for each result. It also provides a `count` slot prop for number of docs in the query.

```svelte
<Collection ref="posts" let:data let:count>
  <p>Fetched {count} documents</p>
  {#each data as post}
    {post.id}
    {post.ref.path}
    {post.content}
  {/each}
</Collection>
```

Collections can also take a Firestore Query instead of a path:

```svelte
<script>
  const myQuery = query(collection(firestore, "posts"), where("test", "==", "test"));
</script>

<Collection ref={myQuery} let:data />
```

### DownloadURL

DownloadURL provides a `link` to download a file from Firebase Storage and its `reference`.

```svelte
<DownloadURL ref={item} let:link let:ref>
  <a href={link} download>Download {ref?.name}</a>
</DownloadURL>
```

### StorageList

StorageList provides a list of `items` and `prefixes` corresponding to the list of objects and sub-folders at a given Firebase Storage path.

```svelte
<StorageList ref="/" let:list>
  <ul>
    {#if list === null}
      <li>Loading...</li>
    {:else if list.prefixes.length === 0 && list.items.length === 0}
      <li>Empty</li>
    {:else}
      <!-- Listing the prefixes -->
      {#each list.prefixes as prefix}
        <li>
          {prefix.name}
        </li>
      {/each}
      <!-- Listing the objects in the given folder -->
      {#each list.items as item}
        <li>
          {item.name}
        </li>
      {/each}
    {/if}
  </ul>
</StorageList>
```

### UploadTask

Upload a file with progress tracking

```svelte
<UploadTask ref="filename.txt" data={someBlob} let:progress let:snapshot>
  {#if snapshot?.state === "running"}
    {progress}% uploaded
  {/if}

  {#if snapshot?.state === "success"}
    <DownloadURL ref={snapshot?.ref} let:link>
      <a href={link} download>Download</a>
    </DownloadURL>
  {/if}
</UploadTask>
```

## Using Components Together

These components can be combined to build complex realtime apps. It's especially powerful when fetching data that requires the current user's UID or a related document's path.

```svelte
<FirebaseApp {auth} {firestore}>
  <SignedIn let:user>
    <p>UID: {user.uid}</p>

    <h3>Profile</h3>
    <Doc ref={`posts/${user.uid}`} let:data={profile} let:ref={profileRef}>
      {profile.content}

      <h4>Comments</h4>
      <Collection ref={profileRef.path + "/comments"} let:data={comments}>
        {#each comments as comment}
          <strong>{comment.content}</strong>
        {/each}

        <div slot="loading">Loading Comments...</div>
      </Collection>

      <div slot="loading">Loading Profile...</div>
    </Doc>
  </SignedIn>

  <SignedOut>
    <p>Sign in to see your profile</p>
  </SignedOut>
</FirebaseApp>
```

## Roadmap

- Add support for Firebase Storage
- Add support for Firebase RTDB
- Add support for Firebase Analytics in SvelteKit
- Find a way to make TS generics with with Doc/Collection components
